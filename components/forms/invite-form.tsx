"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSelect } from "../ui/AppSelect";
import { userRoles } from "@/lib/constants/roles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InviteFormValues } from "@/lib/schemas/invite-schema";
import { inviteFormSchema } from "@/lib/schemas";
import { sendInvite } from "@/lib/api/invite";
import { useState } from "react";
import { set } from "zod";

export function InviteForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSending, setIsSending] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
  });

  const onSubmit = async (data: InviteFormValues) => {
    setIsSending(true);
    try {
      const result = await sendInvite(data);
      toast.message("Invite sent to the user", {
        description: `${data.email}`,
      });
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
      <Card className="shadow-none border-none">
        {/* <CardHeader className="text-centr">
          <CardTitle className="text-primary">
            Invite a user to the platform
          </CardTitle>
          <CardDescription>
            Enter user email and role to invite them to the platform
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-end gap-6">
              <div className="grid gap-3 flex-1">
                <Label htmlFor="email">Email</Label>
                {errors.email && (
                  <p className="text-xs text-red">{errors.email.message}</p>
                )}
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </div>
              <div className="grid gap-3 flex-1">
                <Label htmlFor="password">Role</Label>
                {errors.role && (
                  <p className="text-xs text-red">{errors.role.message}</p>
                )}
                <AppSelect
                  options={userRoles.map((role) => ({
                    value: role.id,
                    label: role.name,
                  }))}
                  value={watch("role")}
                  onChange={(value) => setValue("role", value)}
                  placeholder="Select role"
                />
              </div>
              <Button
                type="submit"
                className="cursor-pointer max-w-lg"
                disabled={isSending}
              >
                Send Invite
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
