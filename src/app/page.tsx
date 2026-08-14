import { InventoryDashboard } from "@/components/inventory-dashboard/InventoryDashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navigation */}
      <header className="bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-bold text-xl tracking-tight">
            Keyloop Inventory Dashboard
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InventoryDashboard />
      </main>
    </div>
  );
}
