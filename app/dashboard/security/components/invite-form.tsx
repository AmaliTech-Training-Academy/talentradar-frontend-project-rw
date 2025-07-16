"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSelect } from "../../../../components/custom/app-select";
import { userRoles } from "@/lib/constants/roles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InviteFormValues } from "@/lib/schemas/invite-schema";
import { inviteFormSchema } from "@/lib/schemas";
import { sendInvite } from "@/lib/api/invite";

export function InviteForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
  });

  const onSubmit = async (data: InviteFormValues) => {
    try {
      const result = await sendInvite(data);
      toast.message("Invite sent to the user", {
        description: `${data.email}`,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-none border-none">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-end gap-6">
              <div className="grid gap-3 flex-1">
                <div className="flex flex-col gap-3 md:flex-row justify-between">
                  <Label htmlFor="email">Email</Label>
                  {errors.email && (
                    <p className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </div>
              <div className="grid gap-3 flex-1">
                <div className="flex flex-col gap-3 md:flex-row justify-between">
                  <Label htmlFor="password">Role</Label>
                  {errors.role && (
                    <p className="text-xs text-destructive">
                      {errors.role.message}
                    </p>
                  )}
                </div>
                <AppSelect
                  options={userRoles.map((role) => ({
                    value: role.id,
                    label: role.name,
                  }))}
                  value={watch("role")}
                  onChangeAction={(value) => setValue("role", value)}
                  placeholder="Select role"
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="cursor-pointer max-w-lg"
                disabled={isSubmitting}
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
