export type NavMainModel = {
    title: string;
    url: string;
    isActive: boolean;
    items?: NavMainModel[];
};