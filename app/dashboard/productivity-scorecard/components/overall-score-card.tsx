import { Badge } from "@/components/ui/badge";
import { ChartColumn } from "lucide-react";
import React from "react";

export const OverallScoreCard = () => {
  return (
    <section className="bg-card  rounded-xl  p-4">
      <article className="w-full justify-between flex items-center px-4 ">
        <p className="text-lg font-bold">Overall score</p>
        <ChartColumn size={30} className="text-primary" />
      </article>
      <article className="items-center space-y-3 pt-3">
        <p className="text-orange text-center font-extrabold w-full text-3xl">
          2.8
        </p>
        <p className=" text-center w-full">2.8</p>
        <Badge className="bg-orange text-white mx-auto block">
          Needs improvement
        </Badge>
      </article>
    </section>
  );
};
