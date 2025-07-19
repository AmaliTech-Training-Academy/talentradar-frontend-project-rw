"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RegisterFormValues,
  RegisterSchema,
} from "@/lib/schemas/register-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RegisterUser } from "@/lib/api/auth";
import { Loader, Lock, Mail, MoveRight, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CustomInput } from "./custom-input";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data: RegisterFormValues) => {
    const requestBody = { ...data, token };
    const result = await RegisterUser(requestBody);
    if (!result.success) {
      return toast.error(result.message || "Failed to set account");
    }
    toast.success(result.message);
    reset();
    router.push("/login");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 mt-3">
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <CustomInput
              Icon={Mail}
              id="email"
              type="email"
              placeholder="email"
              disabled
              value={email ?? ""}
              className="cursor-not-allowed text-muted "
              containerClassName="text-muted hover:cursor-not-allowed"
            />
          </div>
          <Separator orientation="horizontal" className="mt-0 " />
          <div className="grid gap-3">
            <div className="flex gap-3 flex-row justify-between items-start">
              <Label htmlFor="fullName">Full name</Label>
              {errors.fullName && (
                <p className="text-xs text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <CustomInput
              Icon={User}
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
            />
          </div>

          <div className="grid gap-3">
            <div className="flex  gap-3 flex-row justify-between items-start">
              <Label htmlFor="password">Password</Label>

              {errors.password && (
                <p className="text-xs text-destructive text-end">
                  {errors.password.message}
                </p>
              )}
            </div>

            <CustomInput
              Icon={Lock}
              id="password"
              type="password"
              placeholder="********"
              {...register("password")}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex gap-3 md:flex-row justify-between">
              <Label htmlFor="conf-password">Confirm password</Label>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <CustomInput
              Icon={Lock}
              id="conf-password"
              type="password"
              placeholder="********"
              {...register("confirmPassword")}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white py-3 h-fit"
            disabled={isSubmitting}
          >
            Submit
            {isSubmitting && <Loader size={18} />}
            {!isSubmitting && <MoveRight size={18} />}
          </Button>
        </div>
      </div>
    </form>
  );
}
