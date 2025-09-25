import { PopoverContent } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "../ui/popover";
import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import type { JSX } from "react";
import type { NotificationModel } from "@/models/notification/notification.model";
import { toFormatedDate } from "@/utils/format.util";


interface SideNofiticationProps {
    children: React.ReactNode,
    notifications: NotificationModel[],
    hasNotificationToRead: boolean,
    setRead: (notificationId: string) => void,
}

export function SideNofitication({ children, notifications, hasNotificationToRead, setRead }: SideNofiticationProps) {

    const renderNotifications = (notifications: NotificationModel[]): JSX.Element[] => {
        return notifications.map(notify => {
            return(
                <Card className="mt-2 mb-2 p-2 gap-1" key={notify.id}>
                    <CardHeader className="px-1">
                        <CardDescription className="flex justify-between">
                            <span>{notify.content?.title}</span>
                            <span className="text-[10px] p-1">{toFormatedDate(notify.content?.createdAt)}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-1">
                        <div className="flex gap-2 justify-between items-center">
                            <p>{notify.content?.message}</p>
                            {!notify.read &&
                                <Button variant="outline" onClick={() => setRead(notify.id!)}><Check/></Button>
                            }
                        </div>
                    </CardContent>
                </Card>
            );
        });
    };

    return(
        <Popover>
            <PopoverTrigger asChild className="text-left">
                {children}
            </PopoverTrigger>
            <PopoverContent className="bg-gray-50 border rounded-[12px] shadow p-6">
                <Tabs defaultValue="account" className="w-[300px]">
                    <TabsList className="gap-4 justify-between">
                        {hasNotificationToRead && 
                            <TabsTrigger value="notRead" className="text-red-500">Não lida(s)</TabsTrigger>
                        }
                        <TabsTrigger value="read">Lida(s)</TabsTrigger>
                    </TabsList>
                    {hasNotificationToRead && 
                        <TabsContent value="notRead">
                            <ScrollArea className="h-[200px]">
                                {renderNotifications(notifications.filter(notify => !notify.read))}
                            </ScrollArea>
                        </TabsContent>
                    }
                    <TabsContent value="read">
                        <ScrollArea className="h-[200px]">
                            {renderNotifications(notifications.filter(notify => notify.read))}
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}