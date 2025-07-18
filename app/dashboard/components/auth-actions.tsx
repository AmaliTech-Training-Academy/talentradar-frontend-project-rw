"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser, clearUser } from "@/lib/features/authSlice";
import { RoleEnum } from "@/lib/types/user-slice";
import { useRouter } from "next/navigation";

const AuthAction = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  return (
    <>
      {!user.isAuthenticated ? (
        <div className="flex gap-2 justify-center my-2">
          <Button
            variant="outline"
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
            Login as Developer
          </Button>
          <Button
            variant="outline"
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
            Login as Manager
          </Button>
          <Button
            variant="outline"
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
              router.push("/dashboard");
            }}
          >
            Login as Admin
          </Button>
        </div>
      ) : (
        <Button variant="destructive" onClick={() => {
            dispatch(clearUser())
            router.push("/login")
            }} className="my-2">
          Logout
        </Button>
      )}
    </>
  );
};

export default AuthAction;
