import type { NavMainModel } from "@/models/user/nav-main-model";
import { httpClient } from "../api";

export async function getAllNavs(): Promise<NavMainModel[]> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).get<NavMainModel[]>("/navs-main");
    
    return res.data;
}