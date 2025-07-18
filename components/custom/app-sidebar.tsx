"use client";

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
  Brain,
  ChartBarBig,
  ChartColumn,
  FileText,
  GitBranch,
  Home,
  Map,
  Settings,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import { SidebarAccountInfo } from "./sidebar-account-info";
import { RoleEnum } from "@/lib/types/user-slice";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state) => state.auth);
  let userItems = items;
  if (user.isAuthenticated) {
    userItems = items.filter((item) => item.role.includes(user.role!));
  }
  const path = usePathname();
  console.log("Current path:", path);
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-18">
        <Link href={"/"} className="flex gap-2 h-18">
          <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm text-white">
            TR
          </p>
          <div className="flex flex-col font-bold text-xl">
            TalentRadar.AI
            <p className="text-xs font-normal">Mini Version</p>
          </div>
        </Link>
        <Separator orientation="horizontal" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
          <SidebarGroupContent>
            {!user.isAuthenticated ? (
              <Link
                href={"/login"}
                className="cursor-pointer inline-block underline italic"
              >
                <Button variant={"link"}>Login</Button>
              </Link>
            ) : (
              <SidebarMenu className="space-y-3">
                {userItems.map(({ title, url, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild isActive={path === url}>
                      <Link href={url}>
                        <Icon size={20} strokeWidth={1.5} />
                        {title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {user.isAuthenticated && <SidebarAccountInfo />}
      </SidebarFooter>
    </Sidebar>
  );
}
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  {
    title: "Productivity Scorecard",
    url: "/dashboard/productivity-scorecard",
    icon: ChartColumn,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "AI Roadmap & Tests",
    url: "#",
    icon: Map,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "Security Dashboard",
    url: "/dashboard/security",
    icon: UserCheck,
    role: [RoleEnum.ADMIN],
  },
  {
    title: "Self-assessment",
    url: "/dashboard/self-assessment",
    icon: FileText,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "AI Score",
    url: "/dashboard/ai-scores",
    icon: Brain,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER],
  },
  {
    title: "Manager Feedback",
    url: "/dashboard/manager-feedback",
    icon: MessageSquare,
    role: [RoleEnum.MANAGER],
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  {
    title: "Developer Flow",
    url: "#",
    icon: GitBranch,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "Micro services",
    url: "#",
    icon: ChartBarBig,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
];
