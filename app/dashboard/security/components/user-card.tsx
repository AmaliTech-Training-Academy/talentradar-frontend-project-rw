import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import React from "react";

export const UserCard = () => {
  return (
    <div className="w-full flex flex-row gap-2 p-2">
      <p>1.</p>
      <p>Irankomeje Favor Eliab</p>
      <p>favorueliab@gmail.com</p>
      <p>Developer</p>
      <p>Date added</p>
      <Button variant={"secondary"} size={"icon"}>
        <Ellipsis />
      </Button>
    </div>
  );
};
