"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/types";

function AppcomboBox({
  users,
  onUserSelect,
}: {
  users: User[];
  onUserSelect: (userId: string) => void;
}) {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  
  function handleUserSelect(userId: string) {
    setValue(userId);
    onUserSelect(userId);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? users.find((users) => users.id === value)?.name
            : "Select user..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." className="h-9" />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all-users"
                onSelect={() => {
                  setValue("");
                  onUserSelect("");
                  setOpen(false);
                }}
              >
                <div className="flex flex-col">
                  <span>All</span>
                </div>
                <Check
                  className={cn(
                    "ml-auto",
                    value === "" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => {
                    handleUserSelect(user.id);
                  }}
                >
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {user.email}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AppcomboBox;
