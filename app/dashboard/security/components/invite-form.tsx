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
import { useEffect, useState } from "react";
import { getRoles } from "@/lib/api/role";

type InviteFormProps = React.ComponentProps<"div"> & { isOpen: boolean };

export function InviteForm({ isOpen, className, ...props }: InviteFormProps) {
  const [roles, setRoles] =
    useState<{ id: string; roleName: string }[]>(userRoles);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchRoles() {
      setLoading(true);
      const roles = await getRoles();
      if (roles.success) {
        setRoles(roles.data.data.roles);
      } else {
        toast.error(roles.message || "Failed to fetch roles");
      }
      setLoading(false);
    }
    fetchRoles();
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
  });

  const onSubmit = async (data: InviteFormValues) => {
    const result = await sendInvite(data);
    if (!result.success) {
      return toast.error(result.message || "Failed to send invite");
    }
    toast.message(result.message, {
      description: `An invite has been sent to ${data.email}`,
    });
    reset();
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
      {loading && (
        <div className="flex items-center justify-center py-3">
          <Loader className="animate-spin" size={16} />
        </div>
      )}
      {loading && roles.length === 0 && (
        <div className="flex items-center justify-center py-3">
          <p className="text-xs text-muted-foreground">
            No roles available. Please create a role first.
          </p>
        </div>
      )}
      {!loading && roles.length > 0 && (
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
                    {errors.roleId && (
                      <p className="text-xs text-destructive">
                        {errors.roleId.message}
                      </p>
                    )}
                  </div>
                  <AppSelect
                    options={roles.map((role) => ({
                      value: role.id,
                      label: role.roleName,
                    }))}
                    value={watch("roleId")}
                    onChangeAction={(value) => setValue("roleId", value)}
                    placeholder="Select role"
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="cursor-pointer max-w-lg transition-all"
                  disabled={isSubmitting || roles.length === 0}
                >
                  {isSubmitting && (
                    <Loader className="animate-spin" size={20} />
                  )}
                  Send Invite
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
