import { describe, it, expect } from 'vitest'
import React from 'react'
import { renderWithProviders } from '@/test/utils'
import DashboardDefault from '../DashboardDefault'

describe('DashboardDefault', () => {
  it('renders "eCommerce" heading', () => {
    const { getByText } = renderWithProviders(<DashboardDefault />)
    expect(getByText('eCommerce')).toBeInTheDocument()
  })

  it('renders all KPI cards with correct data', () => {
    const { getByText, getAllByText } = renderWithProviders(<DashboardDefault />)

    expect(getByText('Customers')).toBeInTheDocument()
    expect(getByText('3,781')).toBeInTheDocument()
    expect(getByText('+11.01%')).toBeInTheDocument()

    expect(getByText('Orders')).toBeInTheDocument()
    expect(getByText('1,219')).toBeInTheDocument()
    expect(getByText('-0.03%')).toBeInTheDocument()

    const revenueElements = getAllByText('Revenue')
    expect(revenueElements.length).toBeGreaterThan(0)
    expect(getByText('$695')).toBeInTheDocument()
    expect(getByText('+15.03%')).toBeInTheDocument()

    expect(getByText('Growth')).toBeInTheDocument()
    expect(getByText('30.1%')).toBeInTheDocument()
    expect(getByText('+6.08%')).toBeInTheDocument()
  })

  it('renders "Projections vs Actuals" chart section', () => {
    const { getByText, getAllByTestId } = renderWithProviders(<DashboardDefault />)
    
    expect(getByText('Projections vs Actuals')).toBeInTheDocument()
    const barCharts = getAllByTestId('bar-chart')
    expect(barCharts.length).toBeGreaterThan(0)
    const responsiveContainers = getAllByTestId('responsive-container')
    expect(responsiveContainers.length).toBeGreaterThan(0)
  })

  it('renders "Revenue" chart section with legend', () => {
    const { getAllByText, getAllByTestId } = renderWithProviders(<DashboardDefault />)

    const revenueElements = getAllByText('Revenue')
    expect(revenueElements.length).toBeGreaterThan(0)
    expect(getAllByText(/Current Week/).length).toBeGreaterThan(0)
    expect(getAllByText(/Previous Week/).length).toBeGreaterThan(0)
    const lineCharts = getAllByTestId('line-chart')
    expect(lineCharts.length).toBeGreaterThan(0)
  })

  it('renders "Revenue by Location" section with map and location list', () => {
    const { getByText, getByTestId } = renderWithProviders(<DashboardDefault />)
    
    expect(getByText('Revenue by Location')).toBeInTheDocument()
    expect(getByTestId('composable-map')).toBeInTheDocument()

    expect(getByText('New York')).toBeInTheDocument()
    expect(getByText('72K')).toBeInTheDocument()
    expect(getByText('San Francisco')).toBeInTheDocument()
    expect(getByText('39K')).toBeInTheDocument()
    expect(getByText('Sydney')).toBeInTheDocument()
    expect(getByText('25K')).toBeInTheDocument()
    expect(getByText('Singapore')).toBeInTheDocument()
    expect(getByText('61K')).toBeInTheDocument()
  })

  it('renders "Top Selling Products" table with correct columns', () => {
    const { getByText, getAllByText } = renderWithProviders(<DashboardDefault />)
    
    expect(getByText('Top Selling Products')).toBeInTheDocument()

    const nameHeaders = getAllByText('Name')
    expect(nameHeaders.length).toBeGreaterThan(0)
    const priceHeaders = getAllByText('Price')
    expect(priceHeaders.length).toBeGreaterThan(0)
    const quantityHeaders = getAllByText('Quantity')
    expect(quantityHeaders.length).toBeGreaterThan(0)
    const amountHeaders = getAllByText('Amount')
    expect(amountHeaders.length).toBeGreaterThan(0)

    expect(getByText('ASOS Ridley High Waist')).toBeInTheDocument()
    const priceElements = getAllByText('$79.49')
    expect(priceElements.length).toBeGreaterThan(0)

    const quantity82 = getAllByText('82')
    expect(quantity82.length).toBeGreaterThan(0)
    expect(getByText('$6,518.18')).toBeInTheDocument()
  })

  it('renders "Total Sales" pie chart section', () => {
    const { getByText, getByTestId } = renderWithProviders(<DashboardDefault />)
    
    expect(getByText('Total Sales')).toBeInTheDocument()
    expect(getByTestId('pie-chart')).toBeInTheDocument()

    expect(getByText('Direct')).toBeInTheDocument()
    expect(getByText('Affiliate')).toBeInTheDocument()
    expect(getByText('Sponsored')).toBeInTheDocument()
    expect(getByText('E-mail')).toBeInTheDocument()
  })

  it('verifies KPI values and change percentages are displayed correctly', () => {
    const { getByText, getAllByText } = renderWithProviders(<DashboardDefault />)

    const customersCard = getByText('Customers').closest('div')
    expect(customersCard).toHaveTextContent('3,781')
    expect(customersCard).toHaveTextContent('+11.01%')

    const ordersCard = getByText('Orders').closest('div')
    expect(ordersCard).toHaveTextContent('1,219')
    expect(ordersCard).toHaveTextContent('-0.03%')

    const revenueElements = getAllByText('Revenue')
    const revenueKpiCard = revenueElements[0].closest('div')
    expect(revenueKpiCard).toHaveTextContent('$695')
    expect(revenueKpiCard).toHaveTextContent('+15.03%')

    const growthCard = getByText('Growth').closest('div')
    expect(growthCard).toHaveTextContent('30.1%')
    expect(growthCard).toHaveTextContent('+6.08%')
  })

  it('renders all sections in the correct structure', () => {
    const { container } = renderWithProviders(<DashboardDefault />)
    const mainContainer = container.querySelector('.p-4')
    expect(mainContainer).toBeInTheDocument()

    const kpiGrid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2')
    expect(kpiGrid).toBeInTheDocument()
  })
})

