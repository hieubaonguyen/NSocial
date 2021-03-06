import { configure } from 'mobx';
import { createContext } from 'react';
import ActivityStore from './ActivityStore';
import UserStore from './UserStore';
import CommonStore from './CommonStore';
import ModalStore from './ModalStore';
import ProfileStore from './ProfileStore';

configure({enforceActions: 'always'});

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;

    constructor(){
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());