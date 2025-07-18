import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="w-full h-full min-h-screen flex flex-col gap-3 items-center py-16 md:py-16 px-4 bg-linear-to-br from-primary to-[#f54a00] dark:from-violet/10 dark:to-violet/60 ">
      <div className="flex gap-2 h-18">
        <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm text-white bg-gradient-to-r from-primary to-violet">
          TR
        </p>
        <div className="flex flex-col font-bold text-xl text-white ">
          TalentRadar.AI
          <p className="text-xs font-normal">Grobal talent readiness system</p>
        </div>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
