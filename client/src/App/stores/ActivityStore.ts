import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  reaction
} from "mobx";
import { SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../Models/Activity";
import { RootStore } from "./RootStore";
import { createAttendee, setActivityProps } from "../Commons/Utils/util";
import { toast } from "react-toastify";
import { HubConnection, LogLevel } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

const LIMIT = 2;

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.activitiesRegistry.clear();
        this.loadActivities();
      }
    )
  }

  @observable activitiesRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";
  @observable loadingAttendee = false;
  @observable.ref hubConnection: HubConnection | null = null;
  @observable activitiesCount: number = 0;
  @observable page: number = 0;
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, value.toISOString())
      } else {
        params.append(key, value)
      }
    })
    return params;
  }

  @computed get getCountActivities(){
    return this.activitiesRegistry.size;
  }

  @computed get getTotalPage() {
    return Math.ceil(this.activitiesCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action createHubConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44383/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection?.state))
      .catch((error) => console.log("Error Establishing Connection: ", error));

    this.hubConnection.on("RecieveComment", (comment) => {
      runInAction(() => {
        this.activity!.comments!.push(comment);
      });
    });
  };

  @action addMessage = async (values: any) => {
    values.activityId = this.activity!.id;
    try {
      await this.hubConnection!.invoke("SendMessage", values);
    } catch (error) {
      console.log(error);
    }
  };

  @action stopHubConnection = () => {
    this.hubConnection!.stop();
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activitiesEnvelope = await agent.Activities.list(this.axiosParams);
      const { activities, activitiesCount } = activitiesEnvelope;
      runInAction(() => {
        activities.forEach((activity) => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activitiesRegistry.set(activity.id, activity);
        });
        this.activitiesCount = activitiesCount;
        this.loadingInitial = false;
      });
      // console.log(this.groupActivitiesByDate(activities));
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activitiesRegistry.set(activity.id, activity);
          this.activity = activity;
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.isHost = true;
      activity.comments = [];
      runInAction(() => {
        this.activitiesRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      console.log(error.response);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activitiesRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activitiesRegistry.delete(id);

        if (id === this.activity?.id) {
          this.activity = null;
        }
        this.target = "";
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.target = "";
        this.submitting = false;
      });
    }
  };

  @action createAttendee = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loadingAttendee = true;
    try {
      await agent.Activities.attend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activitiesRegistry.set(this.activity.id, this.activity);
          this.loadingAttendee = false;
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem signing up to activity");
      runInAction(() => {
        this.loadingAttendee = false;
      });
    }
  };

  @action cancelAttendee = async () => {
    this.loadingAttendee = true;
    try {
      await agent.Activities.unattend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            (a) => a.userName !== this.rootStore.userStore.user?.userName
          );
          this.activity.isGoing = false;
          this.activitiesRegistry.set(this.activity.id, this.activity);
          this.loadingAttendee = false;
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem cancelling attendee");
      runInAction(() => {
        this.loadingAttendee = false;
      });
    }
  };

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activitiesRegistry.values())
    );
  }

  groupActivitiesByDate = (activities: IActivity[]) => {
    const sortedActivities = activities.sort(
      (a, b) => new Date(a.date!).getTime() - new Date(a.date!).getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = new Date(activity.date!).toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  };

  getActivity = (id: string) => {
    return this.activitiesRegistry.get(id);
  };

  @action clearActivity = () => {
    this.activity = null;
  };
}
