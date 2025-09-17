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
import { SearchForm } from "./search-form"
import { VersionSwitcher } from "./version-swtcher"
import { NavUser } from "./nav-user"
import { useEffect, useState } from "react"
import type { UserModel } from "@/models/user/user-model"
import type { NavMainType } from "@/models/user/nav-main-model"
import { useAuth } from "@/hooks/auth/use-auth"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { userData } = useAuth();
  const [userDataCache, setUserDataCache] = useState<UserModel | undefined>(userData);
  // const [activeMenuItem, setActiveMenuItem] = useState<NavMainType>(userData.navMain[0]);
  
  useEffect(() => {

    console.log("UserDataCache atualizado", userDataCache);
    if(userDataCache) return;
    
    setUserDataCache(userData);

  },[userDataCache]);

  const handleSetActiveMenuItem = (menuItem: NavMainType) => {
    setUserDataCache((prev) => {
      if (!prev) return prev; // mantém o tipo UserModel | undefined

      const updateList = (list?: NavMainType[]): NavMainType[] | undefined => {
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
      <SidebarHeader>
        <VersionSwitcher
          //versions={undefined}
          //defaultVersion={userData.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {userDataCache?.navMain?.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item?.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive} onClick={() => handleSetActiveMenuItem(item)}>
                      <a href={item.url}>{item.title}</a>
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
