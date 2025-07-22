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
// import { Badge } from "@/components/ui/badge";
// import { userData } from "@/lib/data/security-dashboard-data";
import { SelectLabel } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { FileEdit, Loader, Trash2 } from "lucide-react";
import { getAllUsers } from "@/lib/api/user";
import { use, useEffect, useState } from "react";
import { User } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUsers } from "@/lib/features/userSlice";

export const UserManagementTab = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const logedInUser = useAppSelector((state) => state.auth);
  const users = useAppSelector((state) => state.users.users);
  useEffect(() => {
    if (users.length > 0) return; // If users are already loaded, skip fetching
    setIsLoading(true);
    const fetchUsers = async () => {
      const newData = await getAllUsers();
      if (newData.success) {
        //@ts-expect-error - The api response structure was not as it was supposed to be
        // This is a temporary fix, ideally the API should return the correct structure
        dispatch(setUsers(newData.data.data.users));
        // setUsers(newData.data.data.users);
      }
      setIsLoading(false);
    };
    fetchUsers();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      {isLoading && <Loader className="w-6 h-6 animate-spin mx-auto my-4" />}
      {!isLoading && users.length === 0 && (
        <div className="text-center text-gray-500">No users found</div>
      )}
      {!isLoading && users.length > 0 && (
        <AppTable
          columns={columns}
          data={users}
          actionsLabel="Actions"
          renderActions={(user: User) => (
            <>
              {user.id !== logedInUser.id && (
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
            </>
          )}
        />
      )}
    </section>
  );
};

const columns: Column<User>[] = [
  { key: "email", label: "Email" },
  { key: "fullName", label: "Full name", render: (value) => value || "N/A" },
  { key: "role", label: "Role" },
  // {
  //   key: "status",
  //   label: "Status",
  //   render: (value) =>
  //     value ? (
  //       <Badge variant="outline" className="text-green">
  //         Active
  //       </Badge>
  //     ) : (
  //       <Badge variant="outline" className="text-destructive">
  //         Inactive
  //       </Badge>
  //     ),
  // },
  // {
  //   key: "date_added",
  //   label: "Date Added",
  //   render: (val: string | boolean) => {
  //     if (typeof val === "string") {
  //       return new Date(val).toDateString();
  //     }
  //     return null;
  //   },
  // },
];
