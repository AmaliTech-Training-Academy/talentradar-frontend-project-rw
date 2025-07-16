"use client";

import { useState } from "react";
import { AppSelect } from "@/components/custom/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Check, Clock, AlertCircle, CircleCheckBig, Info, XCircle } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { getRelativeTime } from "@/lib/get-relative-time";

type TabCategory = 'ALL' | 'UNREAD' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

const tabs: {
    value: TabCategory;
    icon: React.ElementType
}[] = [
    { value: 'ALL', icon: Bell },
    { value: 'UNREAD', icon: Clock },
    { value: 'INFO', icon: Info },
    { value: 'SUCCESS', icon: CircleCheckBig },
    { value: 'WARNING', icon: AlertCircle },
    { value: 'ERROR', icon: XCircle }
];

const sortOptions = [
    {
        value: 'newest',
        label: 'Newest first',
    },
    {
        value: 'oldest',
        label: 'Oldest first'
    }
]

export default function Notifications() {
    const [activeTab, setActiveTab] = useState(tabs[0].value);
    const [sortFilter, setSortFilter] = useState(sortOptions[0].value);
    // const { notifications, loading } = useNotifications();
    const notifications = [
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "SUCCESS", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z",
            "read_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "WARNING", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z",
            "read_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "ERROR", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z",
            "read_at": "2025-07-15T10:30:00Z"
        },
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "category": "INFO", // SUCCESS | WARNING | ERROR | INFO
            "event_type": "FEEDBACK", // FEEDBACK | ASSESSMENT | OTHER
            "title": "New feedback",
            "content": "Your manager has submitted new feedback",
            "sent_at": "2025-07-15T10:30:00Z",
            "read_at": "2025-07-15T10:30:00Z"
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

    const filteredNotifications = notifications.filter((notification) => {
        if (activeTab === 'ALL') return true;
        if (activeTab === 'UNREAD') return !notification.read_at;
        return notification.category === activeTab;
    });

    const tabCounts = {
        ALL: notifications.length,
        UNREAD: notifications.filter(n => !n.read_at).length,
        INFO: notifications.filter(n => n.category === 'INFO').length,
        SUCCESS: notifications.filter(n => n.category === 'SUCCESS').length,
        WARNING: notifications.filter(n => n.category === 'WARNING').length,
        ERROR: notifications.filter(n => n.category === 'ERROR').length,
    };

    return (
        <main>
            <section className="p-6 bg-gradient-to-r from-primary/5 to-background rounded-t-md border border-input space-y-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary/10 rounded-md">
                            <Bell size="30" className="text-primary" />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl sm:text-3xl">Notification Center</h1>
                            <p>{tabCounts['UNREAD']} unread notifications</p>
                        </div>
                    </div>
                    <Button
                        size="lg"
                        className="py-2 px-4 bg:primary text-white w-fit cursor-pointer"
                    >
                        <Check /> Mark all as read
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        type="search"
                        placeholder="Search notifications"
                    />
                    <AppSelect
                        placeholder="Sort by"
                        options={sortOptions}
                        value={sortFilter}
                        onChangeAction={(value) => setSortFilter(value)}
                    />
                </div>
            </section>
            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as TabCategory)}
                className="w-full overflow-hidden rounded-b-md border-b border-l border-r border-input"
            >
                <TabsList className="flex w-full gap-4 px-6 py-4 border-b border-input">
                    {
                        tabs.map(({ value, icon: Icon }) => (
                                <TabsTrigger
                                    key={value}
                                    value={value}
                                    className="notification_tab_trigger group">
                                    <Icon size={15} />
                                    <span>{value.toLowerCase()}</span>
                                    <span className="notification_count_badge">{tabCounts[value]}</span>
                                </TabsTrigger>
                            ))
                    }
                </TabsList>
                <div className="flex items-center gap-2 px-6 py-4 border-b border-input">
                    <Checkbox id="select_all" />
                    <Label htmlFor="select_all" className="text-foreground/70">Select all ({tabCounts[activeTab]})</Label>
                </div>
                <TabsContent value={activeTab}>
                    <div className="p-2 space-y-2">
                        {filteredNotifications.map((n) => (
                            <div key={n.id} className="rounded-md border p-4 shadow-sm">
                                <p className="font-medium">{n.title}</p>
                                <p className="text-sm text-muted-foreground">{n.content}</p>
                                <p className="text-xs text-muted-foreground">{getRelativeTime(n.sent_at)}</p>
                            </div>
                        ))}
                        {filteredNotifications.length === 0 && (
                            <p className="text-muted-foreground text-center">No notifications found.</p>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
}