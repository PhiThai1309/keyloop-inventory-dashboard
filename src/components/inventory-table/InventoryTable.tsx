"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "@/lib/data";
import { DataTable } from "@manhphi1309/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { getColumns } from "./columns";
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

interface InventoryTableProps {
  data: Vehicle[];
  onUpdateAction: (
    id: string,
    action: string,
  ) => Promise<{ success: boolean; error?: string }>;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function InventoryTable({
  data,
  onUpdateAction,
  onRefresh,
  isRefreshing,
}: InventoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "daysInInventory", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => getColumns({ onUpdateAction }),
    [onUpdateAction],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      const make = String(row.getValue("make")).toLowerCase();
      const model = String(row.getValue("model")).toLowerCase();
      const vin = String(row.getValue("vin")).toLowerCase();
      const status = String(row.getValue("status")).toLowerCase();
      
      const days = Number(row.getValue("daysInInventory"));
      const daysString = String(days);
      const isAgingString = days > 90 ? "aging" : "";

      return (
        make.includes(search) || 
        model.includes(search) || 
        vin.includes(search) || 
        status.includes(search) ||
        daysString.includes(search) ||
        isAgingString.includes(search)
      );
    },
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Filter by Make, Model, VIN, Status, or Age..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {onRefresh && (
          <Button variant="outline" onClick={onRefresh} disabled={isRefreshing}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        )}
      </div>

      <div className="rounded-md bg-white overflow-hidden">
        <DataTable table={table} />
      </div>
    </div>
  );
}
