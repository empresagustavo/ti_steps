import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { VersionSwitcher } from "./version-swtcher"
import { NavUser } from "./nav-user"
import { useEffect, useState } from "react"
import type { UserModel } from "@/models/user/user-model"
import { useAuth } from "@/hooks/auth/use-auth"
import { Link } from "react-router-dom"
import type { NavMainModel } from "@/models/user/nav-main-model"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { userData } = useAuth();
  const [userDataCache, setUserDataCache] = useState<UserModel | undefined>(userData);
  // const [activeMenuItem, setActiveMenuItem] = useState<NavMainModel>(userData.navMain[0]);
  
  useEffect(() => {

    console.log("UserDataCache atualizado", userDataCache);
    if(userDataCache) return;
    
    setUserDataCache(userData);

  },[userDataCache]);

  const handleSetActiveMenuItem = (menuItem: NavMainModel) => {
    setUserDataCache((prev) => {
      if (!prev) return prev; // mantém o tipo UserModel | undefined

      const updateList = (list?: NavMainModel[]): NavMainModel[] | undefined => {
        if (!list) return list;
        return list.map((item) => ({
          ...item,
          // só true quando o próprio título bater com o menu clicado
          isActive: item.title === menuItem.title,
          // atualiza filhos recursivamente (retornando novos objetos)
          items: updateList(item.items),
        }));
      };

      return {
        ...prev,
        navMain: updateList(prev.navMain),
      };
    });
  };

  return (
    <Sidebar {...props} >
      <SidebarHeader className="bg-gray-100">
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent className="bg-gray-100">
        {/* We create a SidebarGroup for each parent. */}
        {userDataCache?.navMain?.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item?.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive} onClick={() => handleSetActiveMenuItem(item)} className={ item.isActive ? "border-b-1 border-blue-400 rounded-none" : ""}>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
        <SidebarFooter>
                <NavUser user={{ name: userDataCache?.name ?? '', avatar: userDataCache?.avatar ?? '', email: userDataCache?.email ?? '' }} />
        </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
