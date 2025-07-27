import { Column } from "../types/app-table";
import { Session } from "../types/sessions";
import { Badge } from "@/components/ui/badge";

export const sessionColumnsData: Column<Session>[] = [
  {
    key: "user",
    label: "User",
    render: (value) => typeof value === "object" && `${value.email}`,
  },
  { key: "deviceInfo", label: "Device" },
  { key: "ipAddress", label: "IP Address" },
  {
    key: "createdAt",
    label: "Created At",
    render: (value) => new Date(value as string).toLocaleString(),
  },
  {
    key: "active",
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
];
