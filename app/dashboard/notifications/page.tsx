"use client";

import { useState } from "react";
import { AppSelect } from "@/components/custom/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Check, Clock, AlertCircle, CircleCheckBig, Info, XCircle, Archive, Star } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { NotificationCard } from "./components/notification-card";

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
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const { notifications, markAsRead, markAllAsRead, dismissNotification } = useNotifications();

    const filteredNotifications = notifications.filter((notification) => {
        if (activeTab === 'ALL') return true;
        if (activeTab === 'UNREAD') return !notification.readAt;
        return notification.category === activeTab;
    });

    const tabCounts = {
        ALL: notifications.length,
        UNREAD: notifications.filter(n => !n.readAt).length,
        INFO: notifications.filter(n => n.category === 'INFO').length,
        SUCCESS: notifications.filter(n => n.category === 'SUCCESS').length,
        WARNING: notifications.filter(n => n.category === 'WARNING').length,
        ERROR: notifications.filter(n => n.category === 'ERROR').length,
    };

    const isAllSelected = filteredNotifications.length > 0 && filteredNotifications.every(n => selectedIds.includes(n.id));

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            const allIds = filteredNotifications.map(n => n.id);
            setSelectedIds(allIds);
        }
    };

    const toggleSingleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(_id => _id !== id)
                : [...prev, id]
        );
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
                        onClick={markAllAsRead}
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
                className="w-full rounded-b-md border-b border-l border-r border-input"
            >
                <TabsList className="flex flex-wrap w-full gap-4 px-6 py-4 border-b border-input">
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
                    <Checkbox id="select_all" checked={isAllSelected} onCheckedChange={toggleSelectAll} />
                    <Label htmlFor="select_all" className="text-foreground/70">Select all ({tabCounts[activeTab]})</Label>
                </div>
                <TabsContent value={activeTab}>
                    <div className="p-2 space-y-2">
                        {filteredNotifications.map((n) => (
                            <NotificationCard
                                key={n.id}
                                notification={n}
                                checked={selectedIds.includes(n.id)}
                                onCheck={() => toggleSingleSelect(n.id)}
                                onMarkRead={() => markAsRead(n.id)}
                                onDismiss={() => dismissNotification(n.id)}
                            />
                        ))}
                        {filteredNotifications.length === 0 && (
                            <p className="text-muted-foreground text-center">No notifications found.</p>
                        )}
                    </div>
                </TabsContent>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 px-6 py-4 border-t border-input text-foreground/80 text-sm">
                    <div>
                        Showing 2 of 2 notifications
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex gap-1 items-center cursor-pointer hover:text-foreground">
                            <Archive size={15} />
                            <span>Archive all read</span>
                        </div>
                        <div className="flex gap-1 items-center cursor-pointer hover:text-foreground">
                            <Star size={15} />
                            <span>Notifications settings</span>
                        </div>
                    </div>
                </div>
            </Tabs>
        </main>
    );
}