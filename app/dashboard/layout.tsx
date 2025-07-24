import { AccountInfo } from "@/components/custom/account-info";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-sidebar flex h-16 shrink-0 items-center gap-2 border-b px-4 py-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Link href={"/"} className="flex gap-2 ">
            <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm text-white">
              TR
            </p>
            <div className="flex flex-col font-bold text-xl">
              TalentRadar.AI
              <p className="text-xs font-normal">
                Global talent readiness system
              </p>
            </div>
          </Link>
          <div
            className="flex-1 gap-2
           flex justify-end items-center h-full"
          >
            <ModeToggle />
            <AccountInfo />
          </div>
        </header>
        <div className="w-full h-full  p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
