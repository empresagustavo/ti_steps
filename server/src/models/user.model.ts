import { NavMainModel } from "./navMain.model";

export type UserModel = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;
    token?: string;
    isAdmin?: boolean;
    password?: string;
    name: string;
    email: string;
    avatar?: string;
    navMain?: NavMainModel[];
};
