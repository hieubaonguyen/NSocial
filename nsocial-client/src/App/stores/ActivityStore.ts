import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import {IActivity} from '../Models/Activity';

class ActivityStore{
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;

    constructor() {
        makeObservable(this);
    }

    @action loadActivities = () => {
        this.loadingInitial = true;
        agent.Activities.list()
        .then(activities => {
            activities.forEach((activity) => {
                activity.date = activity.date.split('.')[0];
                this.activities.push(activity);
            });
        }).finally(() => this.loadingInitial = false);
        
        console.log(this.loadingInitial)
        
    }
}

export default createContext(new ActivityStore())