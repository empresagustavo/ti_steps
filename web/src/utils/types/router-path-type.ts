import { LoginPage } from "@/views/pages/login";
import { UserPage } from "@/views/pages/user";
import type { ComponentType } from "react";
import { MainLayout } from "../../views/pages/layouts/main-layout";
import TriggerPage from "@/views/pages/trigger";
import TriggerRegisterPage from "@/views/pages/trigger/register";
import UserManagement from "@/views/pages/managements/user-management";

export type RouteConfigType = {
    path: string;
    page: ComponentType; // um componente React
};

export const RouterPathType = {
    LOGIN: { path: "/login", page: LoginPage },
    MAIN_LAYOUT: { path: "/", page: MainLayout },
    USER_MANAGEMENT: { path: "management", page: UserManagement },
    USER: { path: "/user", page: UserPage },
    TRIGGER: { path: "/trigger/ranking", page: TriggerPage },
    TRIGGER_REGISTER: { path: "/trigger/register", page: TriggerRegisterPage }
} as const satisfies Record<string, RouteConfigType>;