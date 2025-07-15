"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchemaProps } from "@/lib/schemas/login-schema";
import { toast } from "sonner";
export const LoginForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaProps>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchemaProps> = async (data) => {
    const testData = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(data);
      }, 1000)
    ).then((data) => {
      console.log(data);
      toast.error("Failure", {
        // description: `${errors.root?.message}`,
        position: "top-right",
        style: {
          color: "var(--destructive)",
          border: "1px solid var(--destructive)",
        },
        duration: 3000,
        cancel: {
          label: "Cancel",
          onClick: () => console.log("Canceled!"),
        },
        cancelButtonStyle: {
          backgroundColor: "var(--destructive)",
          color: "var(--background)",
        },
      });
    });
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
          <Input
            id="loginEmail"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <p className="text-xs text-destructive">
              {errors.password && errors.password.message}
            </p>
          </div>
          <Input id="loginPassword" type="password" {...register("password")} />
        </div>
        <Button
          type="submit"
          className="w-full text-white"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader size={18} className="animate-spin " />}
          Login
        </Button>
      </div>
    </form>
  );
};
