import type { UserAuthModel, UserModel } from "@/models/user/user-model";
import { httpClient } from "../api";
import type { UserRelNavMainModel } from "@/models/userRelNavMain/userRelNavMain.model";


export async function findAll({}): Promise<UserModel[]> {
    
    const res = await httpClient({
        "Content-type": "application/json", 
    }).get<UserModel[]>("/users");

    return res.data;
}

export async function create(data: { email: string, password: string }): Promise<UserAuthModel> {
    
    const newData = {email: data.email, password: data.password, name: data.email.split('@')[0] };

    const res = await httpClient({
        "Content-type": "application/json", 
    }).post<UserAuthModel>("/users", newData);

    return res.data;
}

export async function createNavMainAccess({userId, navMainId}: UserRelNavMainModel): Promise<UserRelNavMainModel> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).post<UserRelNavMainModel>("/users/navs", { userId, navMainId });

    return res.data;
}

export async function removeNavMainAccess({userId, navMainId}: UserRelNavMainModel): Promise<boolean> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).delete<boolean>(`/users/${userId}/navs/${navMainId}`);

    return res.data;
}