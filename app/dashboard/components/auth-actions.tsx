"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

const AuthAction = () => {
  const { data: sessionData } = useSession();

  const signInDemo = async (email: string) => {
    await signIn("credentials", {
      email,
      password: "password",
      redirectTo: "/dashboard",
    });
  };
  return (
    <>
      {!sessionData && (
        <div className="flex flex-col gap-2 justify-center my-2">
          <Button
            variant="outline"
            className="py-4 bg-white/30 hover:bg-white/60 hover:text-white text-white h-fit flex justify-between items-center"
            size={"sm"}
            onClick={async () => {
              await signInDemo("developer@gmail.com");
            }}
          >
            Developer <MoveRight />
          </Button>
          <Button
            variant="outline"
            className="py-4 bg-white/30 hover:bg-white/60 hover:text-white text-white h-fit  flex justify-between items-center "
            size={"sm"}
            onClick={async () => {
              await signInDemo("manager@gmail.com");
            }}
          >
            Manager <MoveRight />
          </Button>
          <Button
            variant="outline"
            className="py-4 bg-white/30 hover:bg-white/60 hover:text-white text-white h-fit  flex justify-between items-center "
            size={"sm"}
            onClick={async () => {
              await signInDemo("admin@gmail.com");
            }}
          >
            Admin <MoveRight />
          </Button>
        </div>
      ) 
      }
    </>
  );
};

export default AuthAction;
