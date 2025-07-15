import { RegisterForm } from "@/components/forms/register-form";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 mb-2">
          <Link
            href="/"
            className="flex flex-col items-center gap-2 font-medium"
          >
            <div className="flex size-8 items-center justify-center rounded-md">
              <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm text-white">
                TR
              </p>
            </div>
            <span className="sr-only">TalentRadar</span>
          </Link>
          <h1 className="text-xl font-bold">Set up your account</h1>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
