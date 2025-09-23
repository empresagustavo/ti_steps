import { TriggerVoteModel } from "./triggerVote.model";
import { UserModel } from "./user.model";

export type TriggerModel = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;
    phrase: string;
    author?: UserModel;
    authorId?: string;
    proposerId?: string;
    proposer?: UserModel;
    duration: number;
    votes?: TriggerVoteModel[];
    positiveVotes?: number;
    negativeVotes?: number;
}