import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import {IActivity} from '../Models/Activity';

class ActivityStore{
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | null = null;
    @observable editMode = false;
    @observable submitting = false;

    constructor() {
        makeObservable(this);
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split('.')[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false
        }catch(error){
            console.log(error);
            this.loadingInitial = false
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.filter(a => a.id === id)[0];
        this.editMode = false;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
            
            await agent.Activities.create(activity);
            this.activities.push(activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.submitting = false;
        }catch(error){
            console.log(error);
            this.submitting = false;
        }
    }

    @action openCreateForm = () => {
        this.selectedActivity = null;
        this.editMode = true;
    }
}

export default createContext(new ActivityStore())