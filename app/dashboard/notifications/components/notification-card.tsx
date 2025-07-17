import { Checkbox } from "@/components/ui/checkbox";
import { getRelativeTime } from "@/lib/get-relative-time";
import { INotification } from "@/lib/types/notification";
import clsx from "clsx";
import { AlertCircle, Check, CircleCheckBig, Clock, Dot, Info, X, XCircle } from "lucide-react";
import Link from "next/link";

export const NotificationCard = ({
    notification
}: {
    notification: INotification
}) => {
    const { id, title, content, category, sent_at } = notification;

    return (
        <div className={clsx("rounded-md border py-4 px-4 sm:px-6 shadow-sm flex justify-between gap-4", { 'bg-primary/10': !notification.read_at })}>
            <div className="flex gap-2 sm:gap-3">
                <Checkbox id={id} className="mt-1" />
                <div className="flex gap-2 sm:gap-4">
                    {
                        category === 'SUCCESS' ? <CircleCheckBig className="text-teal" /> :
                            category === 'WARNING' ? <AlertCircle className="text-orange" /> :
                                category === 'ERROR' ? <XCircle className="text-destructive" /> :
                                    <Info className="text-primary" />
                    }
                    <div className="space-y-2">
                        <p className="font-semibold flex space-x-2">
                            {title}
                            {!notification.read_at && <Dot size={40} className="text-primary -mt-2" />}
                        </p>
                        <p className="text-sm text-foreground/80">
                            {content}
                        </p>
                        <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-1">
                                <Clock size={12} />
                                <span className="capitalize">{getRelativeTime(sent_at)}</span>
                            </div>
                            <span>{category[0] + category.slice(1).toLowerCase()}</span>
                            <Link
                                href={`/dashboard/notifications/${id}`}
                                aria-label={`${title} page`}
                                className="text-primary font-semibold"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <Check size={18} className="cursor-pointer" />
                <X size={18} className="cursor-pointer" />
            </div>
        </div>
    );
}