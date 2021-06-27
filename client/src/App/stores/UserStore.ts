import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import agent from '../api/agent';
import {IUser, IUserFormValue} from '../Models/User';
import {RootStore} from './RootStore';
import {history} from '../..';

export default class UserStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;

    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
    }

    @action login = async (values: IUserFormValue) => {
        try{
            const user = await agent.user.login(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            runInAction(() => {
                this.user = user;
            })
            history.push('/activities');
        }catch(error){
            throw error.response;
        }
    }

    @action register = async (values: IUserFormValue) => {
        try{
            const user = await agent.user.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            runInAction(() => {
                this.user = user;
            })
            history.push('/activities');
        }catch(error){
            throw error.response;
        }
    }

    @action getUser = async () => {
        try{
            const user = await agent.user.current();
            runInAction(() => {
                this.user = user;
            })
        }catch(error){
            console.log(error);
        }
    }

    @action logout = () => {
        this.user = null;
        this.rootStore.commonStore.setToken(null);
        history.push('/');
    }
}