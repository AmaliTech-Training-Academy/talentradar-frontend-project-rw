"use client";
import { Tabs } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export const TabComp: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const searchParams = useSearchParams();

  const router = useRouter();
  const handleValueChange = (val: string) => {
    router.push(`?tab=${val}`);
    setActiveTab(val);
  };
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      className="rounded-lg w-full  overflow-hidden"
      onValueChange={handleValueChange}
    >
      {children}
    </Tabs>
  );
};
