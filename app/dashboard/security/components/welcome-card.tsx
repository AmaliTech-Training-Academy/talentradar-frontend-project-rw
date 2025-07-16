"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Shield } from "lucide-react";
import { InviteForm } from "./invite-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const WelcomeCard = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  return (
    <section className="p-3  bg-gradient-to-r from-primary/10 to-violet/10 rounded-md border-input border-[1px] shadow-xs transition-all">
      <section className=" flex flex-col lg:flex-row gap-6 justify-between">
        <article className="flex gap-3 items-center">
          <div className="p-3 h-fit w-fit rounded-lg bg-linear-65 from-primary to-violet aspect-square">
            <Shield size={30} className="text-background" />
          </div>
          <div className="">
            <h1 className="font-bold text-2xl sm:text-3xl">
              Security Dashboard
            </h1>
            <p className="text-foreground/70">
              Comprehensive security monitoring and user management
            </p>
          </div>
        </article>
        <article className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
          <Button
            variant={"outline"}
            onClick={() => setIsAddUserOpen(!isAddUserOpen)}
          >
            {isAddUserOpen ? "Hide " : "Add user"}
            <ChevronDown
              className={cn(
                "duration-300",
                isAddUserOpen ? "rotate-180" : "-rotate-0"
              )}
            />
          </Button>
        </article>
      </section>
      <InviteForm isOpen={isAddUserOpen} />
    </section>
  );
};
