import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppTableProps } from "@/lib/types/app-table";
import { Session } from "@/lib/types/sessions";
// components/ui/AppTable.tsx

type WithId = {
  id: string | number; // depending on your data
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppTable = <T extends WithId>({
  caption,
  columns,
  data,
  renderActions,
  actionsLabel,
}: AppTableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`${col.align === "right" ? "text-right" : ""} px-5`}
              >
                {col.label}
              </TableHead>
            ))}
            {renderActions && (
              <TableHead className="text- px-5">{actionsLabel}</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.id}
              className={`${idx % 2 === 0 ? "bg-muted-foreground/10" : ""}`}
            >
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className={`${
                    col.align === "right" ? "text-right" : ""
                  } px-5 py-3`}
                >
                  {col.render ? col.render(row[col.key]) : String(row[col.key])}
                </TableCell>
              ))}
              {renderActions && (
                <TableCell className="text-center px-5 py-3">
                  {renderActions(row)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppTable;
