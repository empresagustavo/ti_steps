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
import { useFindAllNotifications, useSetNotificationRead } from "@/hooks/notification/notification.hook"
import { toast } from "sonner"
import type { NotificationModel } from "@/models/notification/notification.model"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { userData } = useAuth();
  const [userDataCache, setUserDataCache] = useState<UserModel | undefined>(userData);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);


  const { mutate: getAllNotifications } = useFindAllNotifications(
    (data) => {
      setNotifications(data);
    },
    (error) => {
      toast.error(error.response?.data?.message || `Erro ao carregar as notificações.`, {
        className: "text-red-500 font-semibold"
      });
    }
  )

  const { mutate: setNotificationToRead } = useSetNotificationRead(
    () => {
      getAllNotifications(userData?.id!);
    },
    (error) => {
      toast.error(error.response?.data?.message || `Erro ao confirmar leitura de notificação.`, {
      className: "text-red-500 font-semibold"
      });
    }
  )

  function handleSetNotificationRead(notificationId: string) {

    setNotificationToRead({ id: notificationId, read: true });
  }

  useEffect(() => {

    getAllNotifications(userData?.id!);

    const interval = setInterval(() => {

      getAllNotifications(userData?.id!);

    }, 5000);

    return () => clearInterval(interval);
  }, [getAllNotifications]);
  
  useEffect(() => {

    if(userDataCache) return;
    
    setUserDataCache(userData);

  },[userDataCache]);

  const handleSetActiveMenuItem = (menuItem: NavMainModel) => {
    setUserDataCache((prev) => {
      if (!prev) return prev; 

      const updateList = (list?: NavMainModel[]): NavMainModel[] | undefined => {
        if (!list) return list;
        return list.map((item) => ({
          ...item,
          isActive: item.title === menuItem.title,
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
          <NavUser
              name={userDataCache?.name ?? ''}
              avatar={ userDataCache?.avatar ?? ''} 
              email={ userDataCache?.email ?? ''}
              notifications={notifications}
              setRead={handleSetNotificationRead}/>
        </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
