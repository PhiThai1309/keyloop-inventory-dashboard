export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  vin: string
  daysInInventory: number
  status: string
  proposedAction: string | null
}

export const inventory: Vehicle[] = [
  {
    id: "v1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    vin: "1T1B11BK111111111",
    daysInInventory: 15,
    status: "Available",
    proposedAction: null
  },
  {
    id: "v2",
    make: "Honda",
    model: "Civic",
    year: 2021,
    vin: "2HGCF1F5XMH111111",
    daysInInventory: 45,
    status: "Available",
    proposedAction: null
  },
  {
    id: "v3",
    make: "Ford",
    model: "F-150",
    year: 2023,
    vin: "1FTFW1ED1PFA11111",
    daysInInventory: 95, // Aging stock
    status: "Available",
    proposedAction: null
  },
  {
    id: "v4",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    vin: "5YJ3E1EA1PF111111",
    daysInInventory: 120, // Aging stock
    status: "Available",
    proposedAction: "Discount by 5%"
  },
  {
    id: "v5",
    make: "Chevrolet",
    model: "Silverado",
    year: 2020,
    vin: "1GCPWAEK9LZ111111",
    daysInInventory: 5,
    status: "In Transit",
    proposedAction: null
  },
  {
    id: "v6",
    make: "BMW",
    model: "X5",
    year: 2022,
    vin: "5UXCR6C03N9111111",
    daysInInventory: 110, // Aging stock
    status: "Available",
    proposedAction: null
  },
]
