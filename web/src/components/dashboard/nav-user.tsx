"use client"

import {
  ChevronsUpDown,
  LogOut,
  MessageCircleIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/auth/use-auth"
import type { NotificationModel } from "@/models/notification/notification.model"
import { SideNofitication } from "./notification"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"
import { BellIcon } from "../ui/bell"

interface NavUserProps {
  name: string
  email: string
  avatar: string,
  notifications: NotificationModel[],
  setRead: (notificationId: string) => void,
}

export function NavUser({avatar, email, name, setRead, notifications }: NavUserProps) {
  
  const { logout } = useAuth();
  const { isMobile } = useSidebar()
  const [containsNotifyNotRead, setContainsNotifyNotRead] = useState<boolean>(false);
  const [countNotifyNotRead, setCountNotifyNotRead] = useState<number>(0);

  useEffect(() => {
    const valNotRead = notifications.filter(notify => notify.read === false).length;
    setCountNotifyNotRead(valNotRead)
    setContainsNotifyNotRead(valNotRead > 0)
  }, [notifications])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg">{name.toUpperCase().substring(1,0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              {containsNotifyNotRead && <BellIcon className="text-red-500 infinite"/>}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg">{name.toUpperCase().substring(1, 0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="p-0 m-0">
              <SideNofitication notifications={notifications} hasNotificationToRead={containsNotifyNotRead} setRead={setRead}>
                <Button variant="ghost" className="w-full justify-start text-[13px]">
                  <MessageCircleIcon /> 
                  Notificações 
                  {containsNotifyNotRead && 
                    <Badge className="bg-red-500">
                      {countNotifyNotRead}
                    </Badge>
                  }
                </Button>
              </SideNofitication>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="text-red-500"/>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
