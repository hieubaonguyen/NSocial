export interface IUser{
    userName: string;
    displayName: string;
    token: string;
    image?: string;
}

export interface IUserFormValue{
    userName: string;
    email: string;
    displayName: string;
    password: string;
}