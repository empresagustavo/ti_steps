import type { UserAuthModel } from "@/models/user/user-model";
import { httpClient } from "../api";

export async function login(data: { email: string, password: string }): Promise<UserAuthModel> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).post<UserAuthModel>("/auth", data);

    console.log(res.data)
    return res.data;
}
