import Link from "next/link"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRelativeTime } from "@/lib/get-relative-time";
// import { useNotifications } from "@/lib/hooks/use-notifications";
import { INotification } from "@/lib/types/notification";

export const NotificationDropdown = () => {
    // const { notifications, loading } = useNotifications();
    const loading = false;
    const notifications: INotification[] = [
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "SUCCESS", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "WARNING", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "ERROR", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "INFO", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "SUCCESS", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "INFO", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z"
        }
    ];

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
                        loading ? (
                            <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                        ) : notifications.length === 0 ? (
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
                <DropdownMenuItem className="flex items-center justify-center">
                    <Link href='/dashboard/notifications' aria-label="Notifications page">
                        See more ({notifications.length})
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
