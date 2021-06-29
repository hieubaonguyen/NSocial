export interface IActivity{
    id: string;
    title:string;
    category: string;
    city: string;
    date: Date | null;
    description: string;
    venue: string;
    isHost: boolean;
    isGoing: boolean;
    attendees: IAttendee[];
}

export interface IActivityFormValues extends Partial<IActivity>{
}

export class ActivityFormValues implements IActivityFormValues {
    id: string = '';
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null= null;
    city: string = '';
    venue: string = '';
}

export interface IAttendee {
    displayName: string;
    userName: string;
    isHost: boolean;
    image: string;
}