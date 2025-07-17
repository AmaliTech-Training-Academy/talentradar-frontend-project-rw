"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSelect } from "../../../../components/custom/app-select";
import { userRoles } from "@/lib/constants/roles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InviteFormValues } from "@/lib/schemas/invite-schema";
import { inviteFormSchema } from "@/lib/schemas";
import { sendInvite } from "@/lib/api/invite";
import { Loader } from "lucide-react";

type InviteFormProps = React.ComponentProps<"div"> & { isOpen: boolean };

export function InviteForm({ isOpen, className, ...props }: InviteFormProps) {
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
      await sendInvite(data);
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
    <div
      className={cn(
        "flex flex-col gap-6 transition-all mt-3",
        isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 max-h-0",
        className
      )}
      {...props}
    >
      <Card className="shadow-none border-none pt-3 bg-sidebar">
        <CardContent>
          <h1 className="font-bold text-lg mb-2">Add a user</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 md:gap-6 md:flex-row md:items-end ">
              <div className="grid gap-3 flex-1">
                <div className="flex gap-3 flex-row justify-between">
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
                <div className="flex  gap-3 flex-row text-end justify-between">
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
                className="cursor-pointer max-w-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader className="animate-spin" size={20} />}
                Send Invite
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
