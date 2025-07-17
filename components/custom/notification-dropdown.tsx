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
import { useNotifications } from "@/lib/hooks/use-notifications";

export const NotificationDropdown = () => {
    const { notifications, loading } = useNotifications();

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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
