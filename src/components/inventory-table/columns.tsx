import { ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/lib/data";
import { AgingStockBadge } from "../aging-stock/AgingStockBadge";
import { ActionDialog } from "./ActionDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface ColumnOptions {
  onUpdateAction: (
    id: string,
    action: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

export const getColumns = ({
  onUpdateAction,
}: ColumnOptions): ColumnDef<Vehicle>[] => [
  {
    accessorKey: "vin",
    header: "VIN",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("vin")}</span>
    ),
  },
  {
    accessorKey: "make",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortIcon =
        isSorted === "asc"
          ? ArrowUp
          : isSorted === "desc"
            ? ArrowDown
            : ArrowUpDown;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="px-0!"
        >
          Make <SortIcon className={`ml-2 h-4 w-4 ${isSorted ? "text-blue-600" : "text-muted-foreground"}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: "model",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortIcon =
        isSorted === "asc"
          ? ArrowUp
          : isSorted === "desc"
            ? ArrowDown
            : ArrowUpDown;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="px-0!"
        >
          Model <SortIcon className={`ml-2 h-4 w-4 ${isSorted ? "text-blue-600" : "text-muted-foreground"}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: "year",
    size: 80,
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortIcon =
        isSorted === "asc"
          ? ArrowUp
          : isSorted === "desc"
            ? ArrowDown
            : ArrowUpDown;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="px-0!"
        >
          Year <SortIcon className={`ml-2 h-4 w-4 ${isSorted ? "text-blue-600" : "text-muted-foreground"}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    size: 100,
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortIcon =
        isSorted === "asc"
          ? ArrowUp
          : isSorted === "desc"
            ? ArrowDown
            : ArrowUpDown;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="px-0!"
        >
          Status <SortIcon className={`ml-2 h-4 w-4 ${isSorted ? "text-blue-600" : "text-muted-foreground"}`} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant =
        status === "Available"
          ? "default"
          : status === "In Transit"
            ? "secondary"
            : "outline";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "daysInInventory",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortIcon =
        isSorted === "asc"
          ? ArrowUp
          : isSorted === "desc"
            ? ArrowDown
            : ArrowUpDown;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="px-0!"
        >
          Days in Inventory <SortIcon className={`ml-2 h-4 w-4 ${isSorted ? "text-blue-600" : "text-muted-foreground"}`} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <AgingStockBadge days={row.getValue("daysInInventory")} />
    ),
  },
  {
    accessorKey: "proposedAction",
    header: "Proposed Action",
    cell: ({ row }) => {
      const action = row.getValue("proposedAction") as string | null;
      return action ? (
        <span className="text-sm font-medium text-foreground">{action}</span>
      ) : (
        <span className="text-muted-foreground text-sm italic">None</span>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    size: 100,
    cell: ({ row }) => {
      const vehicle = row.original;
      return vehicle.daysInInventory > 90 ? (
        <ActionDialog vehicle={vehicle} onSave={onUpdateAction} />
      ) : (
        <span className="text-gray-400 text-sm">—</span>
      );
    },
  },
];
