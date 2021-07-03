import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { RootStore } from "./RootStore";
import { IPhoto, IProfile } from "../Models/Profile";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;

  @computed get isCurrentUser() {
    if (this.profile && this.rootStore.userStore.user) {
      return this.profile.userName === this.rootStore.userStore.user.userName;
    } else {
      return false;
    }
  }

  @action getUserProfile = async (userName: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.profile.get(userName);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  };

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.profile.uploadPhoto(file);
      runInAction(() => {
        this.profile?.photos.push(photo);
        if (photo.isMain && this.rootStore.userStore.user) {
          this.rootStore.userStore.user!.image = photo.url;
          this.profile!.image = photo.url;
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem Upload Photo");
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.profile.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.image = photo.url;
        this.profile!.photos.find(p => p.isMain)!.isMain = false;
        this.profile!.photos.find(p => p.id === photo.id)!.isMain = true;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.profile.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter(p => p.id !== photo.id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem Delete Photo");
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
