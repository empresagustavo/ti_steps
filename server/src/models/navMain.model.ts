export type NavMainModel = {
    title: string;
    url: string;
    active?: boolean;
    items?: NavMainModel[];
    createdAt?: Date;
    id?: string;
    updatedAt?: Date;
};