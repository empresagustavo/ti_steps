export type TriggerVoteModel = {
    userId: string;
    triggerId: string;
    vote: boolean;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;
};