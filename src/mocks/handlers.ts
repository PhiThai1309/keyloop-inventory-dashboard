import { http, HttpResponse, delay } from 'msw';
import { inventory as initialInventory, Vehicle } from '@/lib/data';

// In-memory state for MSW
let mockDatabase: Vehicle[] = [...initialInventory];

export const handlers = [
  http.get('/api/inventory', async () => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(800);
    }
    return HttpResponse.json({ data: mockDatabase });
  }),

  http.patch('/api/inventory/:id/action', async ({ request, params }) => {
    if (process.env.NODE_ENV !== 'test') {
      await delay(300);
    }
    
    const { id } = params;
    const body = (await request.json()) as { proposedAction: string };
    
    const vehicleIndex = mockDatabase.findIndex((v) => v.id === id);
    if (vehicleIndex === -1) {
      return HttpResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }

    // Update in-memory DB
    mockDatabase[vehicleIndex] = {
      ...mockDatabase[vehicleIndex],
      proposedAction: body.proposedAction,
    };

    return HttpResponse.json({ data: mockDatabase[vehicleIndex] });
  }),
];
