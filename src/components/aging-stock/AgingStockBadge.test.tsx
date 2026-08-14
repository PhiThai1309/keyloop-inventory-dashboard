import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgingStockBadge } from './AgingStockBadge'

describe('AgingStockBadge Component', () => {
  it('renders correctly for non-aging stock', () => {
    render(<AgingStockBadge days={30} />)
    const badge = screen.getByText('30 days')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-gray-500')
  })

  it('renders correctly for exactly 90 days', () => {
    render(<AgingStockBadge days={90} />)
    const badge = screen.getByText('90 days')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-gray-500')
  })

  it('renders aging stock badge correctly for days > 90', () => {
    render(<AgingStockBadge days={91} />)
    const badge = screen.getByText('91 days (Aging)')
    expect(badge).toBeInTheDocument()
    // It should render a destruct variant badge with animate-pulse class
    expect(badge).toHaveClass('animate-pulse')
  })

  it('supports custom threshold', () => {
    render(<AgingStockBadge days={50} threshold={45} />)
    expect(screen.getByText('50 days (Aging)')).toBeInTheDocument()
  })
})
