"use client";
import AppTable, { Column } from "@/components/custom/app-table";
import {
  SelectTrigger,
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { userData } from "@/lib/data/security-dashboard-data";
import { SelectLabel } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2 } from "lucide-react";

export const UserManagementTab = () => {
  return (
    <section className=" w-full">
      <div className="w-full flex justify-between p-3 pb-0 mb-3">
        <h1 className="font-bold text-xl">List of users</h1>
        <Select>
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
      <AppTable
        columns={columns}
        data={userData}
        actionsLabel="Actions"
        renderActions={() => (
          <div className=" flex items-start gap-1">
            <Button variant={"ghost"} size={"icon"} className="">
              <FileEdit />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-destructive"
            >
              <Trash2 />
            </Button>
          </div>
        )}
      />
    </section>
  );
};

const columns: Column<{
  email: string;
  full_name: string;
  status: boolean;
  role: string;
  date_added: string;
  id: string;
}>[] = [
  { key: "email", label: "Email" },
  { key: "full_name", label: "Full name" },
  { key: "role", label: "Role" },
  {
    key: "status",
    label: "Status",
    render: (value) =>
      value ? (
        <Badge variant="outline" className="text-green">
          Active
        </Badge>
      ) : (
        <Badge variant="outline" className="text-destructive">
          Inactive
        </Badge>
      ),
  },
  {
    key: "date_added",
    label: "Date Added",
    render: (val: string | boolean) => {
      if (typeof val === "string") {
        return new Date(val).toDateString();
      }
      return null;
    },
  },
];
