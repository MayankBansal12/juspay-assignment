import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { renderWithProviders, mockStore } from '@/test/utils'
import OrderList from '../OrderList'
import { orders } from '@/lib/mocks/orders'

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})

describe('OrderList', () => {
  it('renders the "Order List" heading', () => {
    const { getByText } = renderWithProviders(<OrderList />)
    expect(getByText('Order List')).toBeInTheDocument()
  })

  it('calls setActivitySidebarOpen(false) on mount', () => {
    renderWithProviders(<OrderList />)
    expect(mockStore.setActivitySidebarOpen).toHaveBeenCalledWith(false)
    expect(mockStore.setActivitySidebarOpen).toHaveBeenCalledTimes(1)
  })

  it('renders DataTable component with orders data', () => {
    const { getByText } = renderWithProviders(<OrderList />)
    
    // Check if DataTable is rendered by looking for order data
    // The DataTable should display order information
    expect(getByText('Order List')).toBeInTheDocument()
    
    // Check if at least one order ID is present (from the orders mock)
    const firstOrderId = orders[0].id
    expect(getByText(firstOrderId)).toBeInTheDocument()
  })

  it('renders the component structure correctly', () => {
    const { container } = renderWithProviders(<OrderList />)
    
    // Check for main container with padding
    const mainContainer = container.querySelector('.p-4')
    expect(mainContainer).toBeInTheDocument()
    
    // Check for heading
    const heading = container.querySelector('h1')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Order List')
  })

  it('renders all orders from the mock data', () => {
    const { getByText } = renderWithProviders(<OrderList />)
    
    // Check that multiple orders are rendered
    const firstOrder = orders[0]
    const secondOrder = orders[1]
    
    expect(getByText(firstOrder.id)).toBeInTheDocument()
    expect(getByText(secondOrder.id)).toBeInTheDocument()
  })
})

