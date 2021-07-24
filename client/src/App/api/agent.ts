import axios, { AxiosResponse } from "axios";
import { IActivity, IActivityEnvelope } from "../Models/Activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValue } from "../Models/User";
import { IPhoto, IProfile } from "../Models/Profile";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }

  const { status, data, config, headers } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }

  if (
    status === 401 &&
    headers["www-authenticate"] ===
      'Bearer error="invalid_token", error_description="The token is expired"'
  ) {
    window.localStorage.removeItem('jwt');
    history.push('/');
    toast.info("Your session has expired, please login again");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }

  throw error;
});

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Activities = {
  list: (params: URLSearchParams): Promise<IActivityEnvelope> =>
    axios
      .get("/activities", { params: params })
      
      .then(responseBody),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post("/activities", activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.delete(`/activities/${id}`),
  attend: (id: string) => request.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => request.delete(`/activities/${id}/attend`),
};

const user = {
  current: (): Promise<IUser> => request.get("/user"),
  login: (user: IUserFormValue): Promise<IUser> =>
    request.post("/user/login", user),
  register: (user: IUserFormValue): Promise<IUser> =>
    request.post("/user/register", user),
};

const profile = {
  get: (userName: string): Promise<IProfile> =>
    request.get(`/profile/${userName}`),
  uploadPhoto: (file: Blob): Promise<IPhoto> =>
    request.postForm("/photo", file),
  setMainPhoto: (id: string) => request.post(`/photo/${id}/setmain`, {}),
  deletePhoto: (id: string) => request.delete(`/photo/${id}`),
  updateProfile: (profile: Partial<IProfile>) =>
    request.put("/profile", profile),
  follow: (username: string) => request.post(`/profile/${username}/follow`, {}),
  unfollow: (username: string) => request.delete(`/profile/${username}/follow`),
  listFollowings: (username: string, predicate: string) =>
    request.get(`/profile/${username}/follow?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
    request.get(`/profile/${username}/activities?predicate=${predicate}`),
};

const agent = {
  Activities,
  user,
  profile,
};

export default agent;
