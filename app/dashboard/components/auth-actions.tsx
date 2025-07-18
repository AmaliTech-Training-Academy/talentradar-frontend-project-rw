"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser, clearUser } from "@/lib/features/authSlice";
import { RoleEnum } from "@/lib/types/user-slice";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

const AuthAction = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  return (
    <>
      {!user.isAuthenticated ? (
        <div className="flex flex-col gap-2 justify-center my-2">
          <Button
            variant="outline"
            className="py-4 bg-white/30 hover:bg-white/60 hover:text-white text-white h-fit flex justify-between items-center"
            size={"sm"}
            onClick={() => {
              dispatch(
                setUser({
                  id: "1",
                  email: "i9f0j@example.com",
                  username: "developer",
                  role: RoleEnum.DEVELOPER,
                  isAuthenticated: true,
                })
              );
              router.push("/dashboard");
            }}
          >
            Developer <MoveRight />
          </Button>
          <Button
            variant="outline"
            className="py-4 bg-white/30 hover:bg-white/60 hover:text-white text-white h-fit  flex justify-between items-center "
            size={"sm"}
            onClick={() => {
              dispatch(
                setUser({
                  id: "1",
                  email: "i9f0j@example.com",
                  username: "manager",
                  role: RoleEnum.MANAGER,
                  isAuthenticated: true,
                })
              );
              router.push("/dashboard");
            }}
          >
            Manager <MoveRight />
          </Button>
          <Button
            variant="outline"
            className="py-4 bg-white/30 hover:bg-white/60 hover:text-white text-white h-fit  flex justify-between items-center "
            size={"sm"}
            onClick={() => {
              dispatch(
                setUser({
                  id: "1",
                  email: "i9f0j@example.com",
                  username: "admin",
                  role: RoleEnum.ADMIN,
                  isAuthenticated: true,
                })
              );
              router.push("/login");
            }}
          >
            Admin <MoveRight />
          </Button>
        </div>
      ) : (
        <Button
          variant="destructive"
          className="w-full py-3 my-2 h-fit"
          onClick={() => {
            dispatch(clearUser());
            router.push("/login");
          }}
        >
          Logout Demo Account
        </Button>
      )}
    </>
  );
};

export default AuthAction;
