import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { InventoryTable } from './InventoryTable'
import { Vehicle } from '@/lib/data'

const mockData: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2022, vin: 'VIN1', daysInInventory: 100, status: 'Available', proposedAction: null },
  { id: '2', make: 'Honda', model: 'Civic', year: 2021, vin: 'VIN2', daysInInventory: 10, status: 'Available', proposedAction: null },
]

describe('InventoryTable Component Unit Tests', () => {
  it('renders table headers and data correctly', () => {
    render(<InventoryTable data={mockData} onUpdateAction={vi.fn()} />)
    
    expect(screen.getByText('Toyota')).toBeInTheDocument()
    expect(screen.getByText('Honda')).toBeInTheDocument()
    // Days in Inventory -> 100 (Aging)
    expect(screen.getByText('100 days (Aging)')).toBeInTheDocument()
    expect(screen.getByText('10 days')).toBeInTheDocument()
  })

  it('filters data by make or model', () => {
    render(<InventoryTable data={mockData} onUpdateAction={vi.fn()} />)
    
    const filterInput = screen.getByPlaceholderText(/Filter by Make, Model, VIN, Status, or Age/i)
    fireEvent.change(filterInput, { target: { value: 'honda' } })
    
    expect(screen.queryByText('Toyota')).not.toBeInTheDocument()
    expect(screen.getByText('Honda')).toBeInTheDocument()
  })

  it('sorts data by make ascending and descending', async () => {
    render(<InventoryTable data={mockData} onUpdateAction={vi.fn()} />)
    
    // Sort asc (Honda -> Toyota)
    fireEvent.click(screen.getByRole('button', { name: /Make/i }))
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row')
      expect(within(rows[1]).getByText('Honda')).toBeInTheDocument()
      expect(within(rows[2]).getByText('Toyota')).toBeInTheDocument()
    })

    // Sort desc (Toyota -> Honda)
    fireEvent.click(screen.getByRole('button', { name: /Make/i }))
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row')
      expect(within(rows[1]).getByText('Toyota')).toBeInTheDocument()
      expect(within(rows[2]).getByText('Honda')).toBeInTheDocument()
    })
  })
})
