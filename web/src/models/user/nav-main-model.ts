export type NavMainModel = {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
    items?: NavMainModel[];
};