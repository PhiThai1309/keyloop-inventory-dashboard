"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Vehicle } from "@/lib/data";
import { getVehicles, updateVehicleAction } from "@/lib/apiClient";
import { InventoryTable } from "@/components/inventory-table/InventoryTable";
import { DashboardSkeleton } from "./DashboardSkeleton";

export function InventoryDashboard() {
  const queryClient = useQueryClient();

  // 1. Fetching Data with useQuery
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    isRefetching,
    refetch 
  } = useQuery<Vehicle[]>({
    queryKey: ["inventory"],
    queryFn: getVehicles,
  });

  // 2. Mutations with useMutation (Optimistic Updates)
  const mutation = useMutation({
    mutationFn: async ({ id, proposedAction }: { id: string; proposedAction: string }) => {
      return updateVehicleAction(id, proposedAction);
    },
    // When mutate is called:
    onMutate: async ({ id, proposedAction }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["inventory"] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<Vehicle[]>(["inventory"]);

      // Optimistically update to the new value
      if (previousData) {
        queryClient.setQueryData<Vehicle[]>(
          ["inventory"],
          previousData.map((v) =>
            v.id === id ? { ...v, proposedAction } : v
          )
        );
      }

      // Return a context with the previous data to rollback if it fails
      return { previousData };
    },
    // If the mutation fails, use the context we returned above
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["inventory"], context.previousData);
      }
    },
    // Always refetch after error or success to sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  // Wrapper for the table's expected prop signature
  const updateAction = async (id: string, proposedAction: string) => {
    try {
      await mutation.mutateAsync({ id, proposedAction });
      return { success: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: String(err) };
    }
  };

  if (isError) {
    return <div className="p-8 text-red-500">Error: {error?.message}</div>;
  }

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  const agingStockCount = data.filter((v) => v.daysInInventory > 90).length;

  return (
    <>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Vehicle Stock
          </h1>
          <p className="text-gray-500">
            Real-time overview of your dealership&apos;s inventory.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Aging Stock (&gt;90 days)
            </p>
            <p className="text-2xl font-bold text-red-700">{agingStockCount}</p>
          </div>
        </div>
      </div>

      <InventoryTable
        data={data}
        onUpdateAction={updateAction}
        onRefresh={() => refetch()}
        isRefreshing={isRefetching}
      />
    </>
  );
}
