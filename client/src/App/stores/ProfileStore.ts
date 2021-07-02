import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { IProfile } from "../Models/Profile";
import agent from "../api/agent";

export default class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;

  @computed get isCurrentUser(){
    if(this.profile && this.rootStore.userStore.user){
        return this.profile.userName === this.rootStore.userStore.user.userName;
    }else{
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
}
