import { Checkbox } from "@/components/ui/checkbox";
import { getRelativeTime } from "@/lib/get-relative-time";
import { INotification } from "@/lib/types/notification";
import clsx from "clsx";
import { AlertCircle, Check, CircleCheckBig, Clock, Dot, Info, X, XCircle } from "lucide-react";
import Link from "next/link";

export const NotificationCard = ({
    notification,
    checked,
    onCheck,
    onMarkRead,
    onDismiss
}: {
    notification: INotification;
    checked: boolean;
    onCheck: () => void;
    onMarkRead: () => void;
    onDismiss: () => void;
}) => {
    const { id, title, content, category, sentAt } = notification;

    return (
        <div className={clsx("rounded-md border py-4 px-4 sm:px-6 shadow-sm flex justify-between gap-4", { 'bg-primary/10': !notification.readAt })}>
            <div className="flex gap-2 sm:gap-3">
                <Checkbox
                    id={id}
                    className="mt-1"
                    checked={checked}
                    onCheckedChange={onCheck}
                />
                <div className="flex gap-2 sm:gap-4">
                    {
                        category === 'SUCCESS' ? <CircleCheckBig className="text-teal" data-testid="icon-success" /> :
                            category === 'WARNING' ? <AlertCircle className="text-orange" data-testid="icon-warning" /> :
                                category === 'ERROR' ? <XCircle className="text-destructive" data-testid="icon-error" /> :
                                    <Info className="text-primary" data-testid="icon-info" />
                    }
                    <div className="space-y-2">
                        <p className="font-semibold flex space-x-2">
                            {title}
                            {!notification.readAt && <Dot size={40} className="text-primary -mt-2" data-testid="unread-dot" />}
                        </p>
                        <p className="text-sm text-foreground/80">
                            {content}
                        </p>
                        <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-1">
                                <Clock size={12} />
                                <span className="capitalize">{getRelativeTime(sentAt)}</span>
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
                <Check size={18} className="cursor-pointer" onClick={onMarkRead} data-testid="mark-read-button" />
                <X size={18} className="cursor-pointer" onClick={onDismiss} data-testid="dismiss-button" />
            </div>
        </div>
    );
}