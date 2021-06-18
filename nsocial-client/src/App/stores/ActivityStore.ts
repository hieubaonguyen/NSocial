import { action, computed, makeObservable, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import {IActivity} from '../Models/Activity';

export class ActivityStore{
    @observable activitiesRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | null = null;
    @observable editMode = false;
    @observable submitting = false;

    constructor() {
        makeObservable(this);
    }

    @computed get getActivitiesByDate() {
        return Array.from(this.activitiesRegistry.values()).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split('.')[0];
                this.activitiesRegistry.set(activity.id, activity);
            });
            this.loadingInitial = false
        }catch(error){
            console.log(error);
            this.loadingInitial = false
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = false;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
            
            await agent.Activities.create(activity);
            this.activitiesRegistry.set(activity.id, activity);
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