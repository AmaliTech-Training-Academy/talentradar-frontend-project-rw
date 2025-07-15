import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="w-full h-full min-h-screen flex flex-col gap-3 items-center pt-16 md:pt-20 px-4">
      <div className="flex gap-2 h-18">
        <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm text-white">
          TR
        </p>
        <div className="flex flex-col font-bold text-xl">
          TalentRadar.AI
          <p className="text-xs font-normal">Grobal talent readiness system</p>
        </div>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
