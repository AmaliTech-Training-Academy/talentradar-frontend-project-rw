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
import { SidebarAccountInfo } from "./sidebar-account-info";
import { protectedRoutes as items } from "@/lib/constants/protected-routes";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: sessionData, status } = useSession();
  let userItems = items;
  if (sessionData) {
    userItems = items.filter((item) =>
      item.role.includes(sessionData.user.role)
    );
  }
  const path = usePathname();
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
            {status === "loading" && (
              <div className="w-full py-4 flex items-center justify-center">
              <Loader size={24} strokeWidth={1.5} className="animate-spin" />
              </div>
            )}
            {sessionData &&(
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
        {sessionData && <SidebarAccountInfo user={sessionData.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
