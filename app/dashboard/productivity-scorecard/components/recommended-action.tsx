import { MoveRight } from "lucide-react";
import React from "react";

export const RecommendedAction = () => {
  return (
    <section className="w-full bg-primary/10 border-primary border rounded-xl  p-3">
      <h1 className="text-2xl font-bold px-3">Recommended actions</h1>
      <article className="w-full justify-start gap-5 md:gap-20 flex flex-col md:flex-row items-start p-3">
        <div className="space-y-2">
          <h1 className="font-bold text-lg">Immediate (This week)</h1>
          <p className="flex items-center gap-2 ">
            <MoveRight size={20} className="text-primary text-sm" /> Increase
            test coverage to 80%
          </p>
          <p className="flex items-center gap-2 ">
            <MoveRight size={20} className="text-primary text-sm" />
            Attend cross-team standup meetings
          </p>
          <p className="flex items-center gap-2 ">
            <MoveRight size={20} className="text-primary text-sm" /> Complete
            code review backlog
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-lg">Long-term (This month)</h1>
          <p className="flex items-center gap-2 ">
            <MoveRight size={20} className="text-violet text-sm" /> Learn new
            technology stack
          </p>
          <p className="flex items-center gap-2 ">
            <MoveRight size={20} className="text-violet text-sm" />
            Lead a technical initiative
          </p>
          <p className="flex items-center gap-2 ">
            <MoveRight size={20} className="text-violet text-sm" />
            Improve bussiness domain knowledge
          </p>
        </div>
      </article>
    </section>
  );
};
