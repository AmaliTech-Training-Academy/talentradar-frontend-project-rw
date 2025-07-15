"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RegisterFormValues,
  RegisterSchema,
} from "@/lib/schemas/register-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RegisterUser } from "@/lib/api/auth";
import { UserRound } from "lucide-react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSubmitting, setIsSending] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data: RegisterFormValues) => {
    setIsSending(true);
    try {
      const requestBody = { ...data, token };
      await RegisterUser(requestBody);
      toast.success("Account set");
      reset();
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="text-center mb-6">
        <p className="inline-flex items-center text-muted-foreground text-xs bg-foreground/10 rounded-xl px-3 py-1">
          <UserRound size={12} className="inline-block mr-1" />
          <span>{email || ""}</span>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Rad namo"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-red">{errors.fullName.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red">{errors.password.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="conf-password">confirm password</Label>
              <Input
                id="conf-password"
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
