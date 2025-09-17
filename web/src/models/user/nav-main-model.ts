export type NavMainType = {
    title: string;
    url: string;
    isActive: boolean;
    items?: NavMainType[];
};