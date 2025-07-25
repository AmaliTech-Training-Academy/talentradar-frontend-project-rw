"use client";
import { Loader, Lock, LogIn, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchemaProps } from "@/lib/schemas/login-schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomInput } from "./custom-input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginUser } from "@/lib/api/auth";
import { LoginResponse } from "@/lib/types/auth";
import {
  toastErrorOptions,
  toastSuccessOptions,
} from "@/lib/constants/toast-options";
export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaProps>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchemaProps> = async ({
    email,
    password,
  }) => {
    try {
      const loginRes = await loginUser({
        email,
        password,
      });

      const loginJson: LoginResponse = await loginRes.json();
      const [loginStatus, nextAuth] = await Promise.allSettled([
        Promise.resolve(loginJson),
        signIn("credentials", {
          email,
          password,
          redirect: false,
        }),
      ]);
      const loginSuccess =
        loginStatus.status === "fulfilled" && loginStatus.value.status;
      const nextAuthSuccess =
        nextAuth.status === "fulfilled" && !nextAuth.value?.error;
      if (!loginSuccess || !nextAuthSuccess) {
        const errorMsg =
          (loginStatus.status === "fulfilled" &&
            loginStatus.value.errors?.[0]?.message) ||
          (nextAuth.status === "fulfilled" && nextAuth.value?.error) ||
          "Login failed";
        setError("root", {
          message: errorMsg,
        });
        toast.error("Failure", {
          description: `${errorMsg || "Login failed"}`,
          position: "top-right",
          ...toastErrorOptions,
        });
        return;
      }
      toast.success("Login successful", {
        position: "top-right",
        ...toastSuccessOptions,
      });
      router.push("/dashboard");
    } catch (err) {
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
      console.error("Login error:", err);
      toast.error("Failure", {
        description: `${errors.root?.message || "Login failed"}`,
        position: "top-right",
        ...toastErrorOptions,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Email</Label>
            <p className="text-xs text-destructive ">
              {errors.email && errors.email.message}
            </p>
          </div>
          <CustomInput
            Icon={Mail}
            id="loginEmail"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-1 justify-between">
            <Label htmlFor="password">Password</Label>
            <p className="text-xs text-destructive text-end">
              {errors.password && errors.password.message}
            </p>
          </div>
          <CustomInput
            Icon={Lock}
            id="loginPassword"
            type="password"
            placeholder="*******"
            {...register("password")}
          />
        </div>
        <Button
          type="submit"
          className="w-full text-white py-3 h-fit"
          disabled={isSubmitting}
        >
          Login
          {isSubmitting && <Loader size={18} className="animate-spin " />}
          {!isSubmitting && <LogIn size={18} />}
        </Button>
      </div>
    </form>
  );
};
