export interface IProfile {
    displayName: string;
    userName: string;
    image: string;
    bio: boolean;
    photos: IPhoto[];
}

export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}