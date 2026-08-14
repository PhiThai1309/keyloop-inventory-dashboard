import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ActionDialog } from './ActionDialog'
import { Vehicle } from '@/lib/data'

const mockVehicle: Vehicle = {
  id: '1',
  make: 'Honda',
  model: 'Civic',
  year: 2021,
  vin: 'VIN123',
  daysInInventory: 100,
  status: 'Available',
  proposedAction: null
}

describe('ActionDialog Component', () => {
  it('renders Log Action button when no action exists', () => {
    render(<ActionDialog vehicle={mockVehicle} onSave={vi.fn()} />)
    expect(screen.getByText('Log Action')).toBeInTheDocument()
  })

  it('renders Edit Action button when action exists', () => {
    const vehicleWithAction = { ...mockVehicle, proposedAction: 'Discount planned' }
    render(<ActionDialog vehicle={vehicleWithAction} onSave={vi.fn()} />)
    expect(screen.getByText('Edit Action')).toBeInTheDocument()
  })

  it('opens dialog on click and displays vehicle details', async () => {
    render(<ActionDialog vehicle={mockVehicle} onSave={vi.fn()} />)
    fireEvent.click(screen.getByText('Log Action'))
    
    expect(await screen.findByText('Log Proposed Action')).toBeInTheDocument()
    expect(screen.getByText(/2021 Honda Civic/i)).toBeInTheDocument()
  })

  it('calls onSave with correct id and action text', async () => {
    const handleSave = vi.fn().mockResolvedValue({ success: true })
    render(<ActionDialog vehicle={mockVehicle} onSave={handleSave} />)
    
    fireEvent.click(screen.getByText('Log Action'))
    
    const input = await screen.findByRole('textbox', { name: /action/i })
    fireEvent.change(input, { target: { value: 'Reduce price' } })
    
    fireEvent.click(screen.getByText('Save changes'))
    
    expect(handleSave).toHaveBeenCalledWith('1', 'Reduce price')
  })
})
