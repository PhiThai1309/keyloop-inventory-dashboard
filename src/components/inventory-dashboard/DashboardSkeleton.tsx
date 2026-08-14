export function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <div className="h-9 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-72 bg-gray-200 rounded"></div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
          <div>
            <div className="h-5 w-32 bg-gray-200 rounded mb-1"></div>
            <div className="h-8 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-64 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="rounded-md bg-white border overflow-hidden">
          <div className="h-12 bg-gray-100 border-b"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b flex items-center px-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
