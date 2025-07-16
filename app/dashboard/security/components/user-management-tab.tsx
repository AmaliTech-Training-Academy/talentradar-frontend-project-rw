"use client";
import {
  SelectTrigger,
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { UserCard } from "./user-card";
import { SelectLabel } from "@radix-ui/react-select";

export const UserManagementTab = () => {
  return (
    <section className=" w-full">
      <div className="w-full flex justify-between p-3 mb-3">
        <p>List of users</p>
        <Select onValueChange={(e) => console.log(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="ps-1 text-sm">Filter</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="developers">Developers</SelectItem>
              <SelectItem value="managers">Managers</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {Array.from({ length: 3 }, (_) => crypto.randomUUID()).map((id) => (
        <UserCard key={id} />
      ))}
    </section>
  );
};
