import type { TriggerVoteModel } from "@/models/trigger/triggerVote.model";
import { httpClient } from "../api";
import type { TriggerModel } from "@/models/trigger/trigger.model";


export async function findAll(data: {startDate: Date, endDate: Date}): Promise<TriggerModel[]> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).get<TriggerModel[]>(`/triggers?cas=${data.startDate}&cae=${data.endDate}`);

    return res.data;
}

export async function create({ duration, phrase, authorId, proposerId }: TriggerModel): Promise<TriggerModel> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).post<TriggerModel>("/triggers", { duration, phrase, authorId, proposerId });

    return res.data;
}

export async function update({ id }: TriggerModel): Promise<TriggerModel> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).put<TriggerModel>(`/triggers/${id}`, { active: false });

    return res.data;
}

export async function vote({ triggerId, userId, vote }: TriggerVoteModel): Promise<TriggerVoteModel> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).post<TriggerVoteModel>("/triggers/vote", { triggerId, userId, vote });

    return res.data;
}