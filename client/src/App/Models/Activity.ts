export interface IActivity{
    id: string;
    title:string;
    category: string;
    city: string;
    date: Date | null;
    description: string;
    venue: string;
}