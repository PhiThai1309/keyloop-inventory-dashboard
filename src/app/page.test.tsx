import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InventoryDashboard } from "@/components/inventory-dashboard/InventoryDashboard";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
}));

let queryClient: QueryClient;

function renderWithQueryClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe("Inventory Dashboard Integration", () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it("displays inventory", async () => {
    renderWithQueryClient(<InventoryDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Toyota")).toBeInTheDocument();
      expect(screen.getByText("Honda")).toBeInTheDocument();
    });
  });

  it("filters vehicles by make", async () => {
    renderWithQueryClient(<InventoryDashboard />);

    await waitFor(() => expect(screen.getByText("Toyota")).toBeInTheDocument());

    const filterInput = screen.getByPlaceholderText(
      /Filter by Make, Model, VIN, Status, or Age/i,
    );
    fireEvent.change(filterInput, { target: { value: "honda" } });

    expect(screen.queryByText("Toyota")).not.toBeInTheDocument();
    expect(screen.getByText("Honda")).toBeInTheDocument();
  });

  it("filters vehicles by model", async () => {
    renderWithQueryClient(<InventoryDashboard />);

    await waitFor(() => expect(screen.getByText("Camry")).toBeInTheDocument());

    const filterInput = screen.getByPlaceholderText(
      /Filter by Make, Model, VIN, Status, or Age/i,
    );
    fireEvent.change(filterInput, { target: { value: "f-150" } });

    expect(screen.queryByText("Camry")).not.toBeInTheDocument();
    expect(screen.getByText("Ford")).toBeInTheDocument();
  });

  it("identifies vehicle older than 90 days", async () => {
    renderWithQueryClient(<InventoryDashboard />);

    await waitFor(() => {
      // Ford F-150 is 95 days old
      expect(screen.getByText("95 days (Aging)")).toBeInTheDocument();
    });
  });

  it("does not mark non-aging stock as aging", async () => {
    renderWithQueryClient(<InventoryDashboard />);

    await waitFor(() => {
      // Honda Civic is 45 days old
      expect(screen.getByText("45 days")).toBeInTheDocument();
      expect(screen.queryByText("45 days (Aging)")).not.toBeInTheDocument();
    });
  });

  it("allows manager to update proposed action", async () => {
    renderWithQueryClient(<InventoryDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Ford")).toBeInTheDocument();
    });

    // Find the log action button for the aging vehicle
    // Ford is the first aging stock without an action
    const logActionButtons = screen.getAllByText("Log Action");
    expect(logActionButtons.length).toBeGreaterThan(0);

    fireEvent.click(logActionButtons[0]);

    // Wait for modal
    const dialogTitle = await screen.findByText("Log Proposed Action");
    expect(dialogTitle).toBeInTheDocument();

    // Type the action
    const input = screen.getByRole("textbox", { name: /action/i });
    fireEvent.change(input, { target: { value: "Discount by 15%" } });

    // Save
    const saveBtn = screen.getByText("Save changes");
    fireEvent.click(saveBtn);

    // The modal should close, and the button should now say "Edit Action"
    await waitFor(() => {
      expect(screen.getByText("Edit Action")).toBeInTheDocument();
    });
  });
});
