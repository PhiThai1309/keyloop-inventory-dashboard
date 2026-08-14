import { Vehicle } from "./data";

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch("/api/inventory");
  if (!res.ok) throw new Error("Failed to fetch inventory");
  const json = await res.json();
  return json.data;
}

export async function updateVehicleAction(vehicleId: string, action: string): Promise<Vehicle> {
  const res = await fetch(`/api/inventory/${vehicleId}/action`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ proposedAction: action }),
  });
  if (!res.ok) throw new Error("Failed to update action");
  const json = await res.json();
  return json.data;
}
