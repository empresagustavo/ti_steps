import { LoginPage } from "@/views/pages/login";
import { UserPage } from "@/views/pages/user";
import type { ComponentType } from "react";
import { DashboardPage } from "../../views/pages/dashboard";
import TriggerPage from "@/views/pages/trigger";

export type RouteConfigType = {
    path: string;
    page: ComponentType; // um componente React
};

export const RouterPathType = {
    LOGIN: { path: "/login", page: LoginPage },
    DASHBOARD: { path: "/dashboard", page: DashboardPage },
    USER: { path: "/user", page: UserPage },
    TRIGGER: { path: "/trigger/ranking", page: TriggerPage }
} as const satisfies Record<string, RouteConfigType>;