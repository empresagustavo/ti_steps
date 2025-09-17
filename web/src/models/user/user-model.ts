import type { NavMainType } from "./nav-main-model";


export type UserModel = Omit<
    UserAuthModel, 
    "token"
>

export type UserAuthModel = {
    token: string;
    name: string;
    email: string;
    avatar: string;
    navMain?: NavMainType[];
};
