import { action, makeObservable, observable } from 'mobx';
import {RootStore} from './RootStore';

export default class ModalStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @observable.shallow modal = {
        open: false,
        content: null
    }

    @action openModal = (content: any) => {
        this.modal.open = true;
        this.modal.content =  content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.content =  null;
    }
}