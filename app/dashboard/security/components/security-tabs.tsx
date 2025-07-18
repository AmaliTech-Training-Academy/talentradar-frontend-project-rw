import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Activity, Clock3, Settings, Shield, Users } from "lucide-react";
import { UserManagementTab } from "./user-management-tab";
import { SecurityAlerts } from "./overview/overview-recent-alerts";
import { SessionsTable } from "./sessions/sessions";
import { RecentActivity } from "../../components/recent-activity";
import { activities } from "@/lib/data/welcome";

export const SecurityTabs = () => {
  return (
    <main className="w-full bg-sidebar rounded-xl">
      <Tabs
        defaultValue="overview"
        className="rounded-lg w-full  overflow-hidden"
      >
        <TabsList className="h-fit p-0 pt-2 rounded-none px-3 border-b-2 border-muted bg-sidebar w-full">
          <TabsTrigger value="overview" className="security_tab_trigger">
            <Shield /> Security Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="security_tab_trigger">
            <Users /> User Management
          </TabsTrigger>
          <TabsTrigger value="sessions" className="security_tab_trigger">
            <Activity /> Active Sessions
          </TabsTrigger>
          <TabsTrigger value="logs" className="security_tab_trigger">
            <Clock3 /> Activity Logs
          </TabsTrigger>
          <TabsTrigger value="settings" className="security_tab_trigger">
            <Settings /> Security settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-3 w-full ">
          <SecurityAlerts />
        </TabsContent>
        <TabsContent value="users" className="p-3 w-full">
          <UserManagementTab />
        </TabsContent>
        <TabsContent value="sessions" className="p-3 w-full">
          <SessionsTable />
        </TabsContent>
        <TabsContent value="logs" className="p-3 w-full">
          <RecentActivity activities={activities} title="Activity logs" />
        </TabsContent>
        <TabsContent value="settings" className="p-3 w-full">
          <p className="w-full p-3">Coming soon...</p>
        </TabsContent>
      </Tabs>
    </main>
  );
};
