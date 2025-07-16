import { RegisterForm } from "@/app/(auth)/components/register-form";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm shadow-sm rounded-lg p-6 border-1">
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold">Set up your account</h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
