import type { NavMainModel } from "./nav-main-model";


export type UserModel = Omit<
    UserAuthModel, 
    "token"
>

export type UserAuthModel = {

    id: string;
    token: string;
    name: string;
    isAdmin: boolean;
    email: string;
    avatar: string;
    navMain?: NavMainModel[];
};
