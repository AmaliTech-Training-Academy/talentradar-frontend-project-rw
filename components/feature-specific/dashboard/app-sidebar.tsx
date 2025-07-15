import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Bell,
  ChartBarBig,
  ChartColumn,
  FileText,
  GitBranch,
  Home,
  Map,
  Settings,
  Send,
} from "lucide-react";
import { SidebarAccountInfo } from "./sidebar-account-info";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-18">
        <div className="flex gap-2 h-18">
          <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm text-white">
            TR
          </p>
          <div className="flex flex-col font-bold text-xl">
            TalentRadar.AI
            <p className="text-xs font-normal">Mini Version</p>
          </div>
        </div>
        <Separator orientation="horizontal" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map(({ title, isActive, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={url}>
                      <Icon size={20} strokeWidth={1.5} />
                      {title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarAccountInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
const items = [
  {
    title: "Dashabord",
    url: "#",
    isActive: true,
    icon: Home,
  },
  {
    title: "Productivity scored",
    url: "#",
    icon: ChartColumn,
  },
  {
    title: "AI Roadmap & Tests",
    url: "#",
    icon: Map,
  },
  {
    title: "Invites",
    url: "/admin/invite",
    icon: Send,
  },
  {
    title: "Self-assessment",
    url: "#",
    icon: FileText,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
  {
    title: "Developer Flow",
    url: "#",
    icon: GitBranch,
  },
  {
    title: "Micro services",
    url: "#",
    icon: ChartBarBig,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
