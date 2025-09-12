import { LoginPage } from "@/views/pages/login";
import { UserPage } from "@/views/pages/user";
import type { ComponentType } from "react";

export type RouteConfig = {
    path: string;
    page: ComponentType; // um componente React
};

export const RouterPathType = {
    LOGIN: { path: "/login", page: LoginPage },
    USER: { path: "/user", page: UserPage },
} as const satisfies Record<string, RouteConfig>;