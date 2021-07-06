import axios, { AxiosResponse } from 'axios';
import {IActivity} from '../Models/Activity';
import {history} from '../..';
import { toast } from "react-toastify";
import { IUser, IUserFormValue } from '../Models/User';
import { IPhoto, IProfile } from '../Models/Profile';

axios.defaults.baseURL = 'https://localhost:44383';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {

    if(error.message === 'Network Error' && !error.response){
        toast.error("Network error - make sure API is running!")
    }

    const {status, data, config } = error.response;

    if(status === 404){
        history.push('/notfound');
    }

    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')){
        history.push('/notfound');
    }

    if(status === 500){
        toast.error("Server error - check the terminal for more info!")
    }

    throw error;
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const request = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
    postForm: (url: string, file: Blob) => {
        const formData = new FormData();
        formData.append("File", file);
        return axios.post(url, formData, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(responseBody);
    }
}

const Activities = {
    list: (): Promise<IActivity[]> => request.get('/activities'),
    details: (id: string) => request.get(`/activities/${id}`),
    create: (activity: IActivity) => request.post('/activities', activity),
    update: (activity: IActivity) => request.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.delete(`/activities/${id}`),
    attend: (id: string) => request.post(`/activities/${id}/attend`, {}),
    unattend: (id: string) => request.delete(`/activities/${id}/attend`)
}

const user = {
    current: (): Promise<IUser> => request.get('/user'),
    login: (user: IUserFormValue): Promise<IUser> => request.post('/user/login', user),
    register: (user: IUserFormValue): Promise<IUser> => request.post('/user/register', user)
}

const profile = {
    get: (userName: string): Promise<IProfile> => request.get(`/profile/${userName}`),
    uploadPhoto: (file: Blob): Promise<IPhoto> => request.postForm('/photo', file),
    setMainPhoto: (id: string) => request.post(`/photo/${id}/setmain`, {}),
    deletePhoto: (id: string) => request.delete(`/photo/${id}`),
    updateProfile: (profile: Partial<IProfile>) => request.put('/profile', profile)
}

const agent = {
    Activities,
    user,
    profile
}

export default agent;