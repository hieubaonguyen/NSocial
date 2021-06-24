import { action, computed, configure, makeObservable, observable, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import {IActivity} from '../Models/Activity';

configure({enforceActions: 'always'});

export class ActivityStore{

    @observable activitiesRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable submitting = false;
    @observable target = '';

    constructor() {
        makeObservable(this);
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach((activity) => {
                    activity.date = new Date(activity.date!);
                    this.activitiesRegistry.set(activity.id, activity);
                })
                this.loadingInitial = false;
            });
            // console.log(this.groupActivitiesByDate(activities));
        }catch(error){
            console.log(error);
            runInAction(() => { 
                this.loadingInitial = false
            })
        }
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.activity = activity;
            return activity;
        }else{
            this.loadingInitial = true;
            try
            {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    activity.date = new Date(activity.date!);
                    this.activitiesRegistry.set(activity.id, activity);
                    this.activity = activity;
                    this.loadingInitial = false;
                });
                return activity;
            }catch(error){
                runInAction(() => { 
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
            
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activitiesRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            })        
        }catch(error){
            console.log(error.response);
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activitiesRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            })
        }
    } 

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activitiesRegistry.delete(id);
            
                if(id === this.activity?.id){
                    this.activity = null;
                }
                this.target = '';
                this.submitting = false;
            })
        } catch(error){
            console.log(error);
            runInAction(() => {
                this.target = '';
                this.submitting = false;
            })
        }
    }

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activitiesRegistry.values()));
    }

    groupActivitiesByDate = (activities: IActivity[]) => {

        const sortedActivities = activities.sort((a, b) => new Date(a.date!).getTime() - new Date(a.date!).getTime());
            
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = new Date(activity.date!).toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key: string]: IActivity[]}))
    }

    getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    @action clearActivity = () => {
        this.activity = null;
    }
}

export default createContext(new ActivityStore())