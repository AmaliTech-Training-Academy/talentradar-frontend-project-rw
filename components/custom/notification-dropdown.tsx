import { INotification } from "@/lib/types/notification"
import Link from "next/link"
import { Bell } from "lucide-react"
import { useEffect, useState } from "react";
import { getAllNotifications } from "@/lib/api/notification";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getRelativeTime } from "@/lib/get-relative-time";

export const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const data = await getAllNotifications();
            if (!data.success) toast.error(data.message);
            setNotifications(notifications);
        }

        fetchNotifications();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer relative">
                <Bell size={25} />
                <p className="absolute -top-2 -right-1 bg-destructive text-xs text-white rounded-full flex items-center justify-center gap-2 h-5 w-5">
                    {notifications.length}
                </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px]" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuGroup className="space-y-2 p-2">
                    {
                        notifications.length === 0 ? (
                            <DropdownMenuItem disabled>
                                0 notifications
                            </DropdownMenuItem>
                        ) : (
                            notifications.map(notification => {
                                const { id, content, sent_at, title } = notification
                                return (
                                    <DropdownMenuItem key={id} className="border-[#f4f4f5] border-2 hover:bg-[#f4f4f5] dark:border-[#27272a] dark:hover:bg-[#27272a]">
                                        <Link
                                            href={`/dashboard/notifications/${id}`}
                                            className="p-1 rounded-md space-y-2"
                                        >
                                            <div className="flex justify-between">
                                                <p className="text-sm font-medium">{title}</p>
                                                <p className="capitalize text-xs">{getRelativeTime(sent_at)}</p>
                                            </div>
                                            <p className="text-xs">{content.length > 40 ? (content.slice(0, 40) + '...') : content}</p>
                                        </Link>
                                    </DropdownMenuItem>
                                )
                            })
                        )
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}