import { LoginPage } from "@/views/pages/login";
import { UserPage } from "@/views/pages/user";
import type { ComponentType } from "react";
import { MainLayout } from "../../views/pages/layouts/main-layout";
import TriggerPage from "@/views/pages/trigger";
import TriggerRegisterPage from "@/views/pages/trigger/register";
import UserManagement from "@/views/pages/managers/user.manager";
import Unauthorized from "@/views/pages/defaults/unauthorized.default";
import { MemoriesPage } from "@/views/pages/memories";
import SnackPage from "@/views/pages/snack";
import RegisterSnackPage from "@/views/pages/snack/register";

export type RouteConfigType = {
    path: string;
    page: ComponentType; // um componente React
};

export const RouterPathType = {
    LOGIN: { path: "/login", page: LoginPage },
    MAIN_LAYOUT: { path: "/", page: MainLayout },
    USER_MANAGERS: { path: "managers/users", page: UserManagement },
    USER: { path: "/user", page: UserPage },
    TRIGGER: { path: "/trigger/ranking", page: TriggerPage },
    MEMORIES: { path: "/memories/album", page: MemoriesPage },
    TRIGGER_REGISTER: { path: "/trigger/register", page: TriggerRegisterPage },
    UNAUTHORIZED: { path: "/unauthorized", page: Unauthorized },
    SNACK: { path: "/snack/ranking", page: SnackPage },
    SNACK_REGISTER: { path: "/snack/register", page: RegisterSnackPage }
} as const satisfies Record<string, RouteConfigType>;