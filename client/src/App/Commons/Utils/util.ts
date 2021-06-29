import {IActivity, IAttendee} from '../../Models/Activity';
import {IUser} from '../../Models/User';

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date!);
    activity.isGoing = activity.attendees.some(
        a => a.userName === user.userName
    )
    activity.isHost = activity.attendees.some(
        a => a.userName === user.userName && a.isHost
    )
    return activity;
}

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        userName: user.userName,
        image: user.image!,
        isHost: false
    };
}