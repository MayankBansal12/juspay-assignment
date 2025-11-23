import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

export const mockStore = {
  isLeftSidebarOpen: true,
  isActivitySidebarOpen: true,
  theme: 'light',
  toggleLeftSidebar: vi.fn(),
  toggleActivitybar: vi.fn(),
  setLeftSidebarOpen: vi.fn(),
  setActivitySidebarOpen: vi.fn(),
  setTheme: vi.fn(),
}

vi.mock('@/store/useStore', () => ({
  useStore: vi.fn((selector) => {
    if (typeof selector === 'function') {
      return selector(mockStore)
    }
    return mockStore
  }),
}))

vi.mock('recharts', () => ({
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: ({ children }) => <div data-testid="pie">{children}</div>,
  Cell: () => <div data-testid="cell" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Legend: () => <div data-testid="legend" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
}))

vi.mock('react-simple-maps', () => ({
  ComposableMap: ({ children }) => <div data-testid="composable-map">{children}</div>,
  Geographies: ({ children }) => <div data-testid="geographies">{children?.({ geographies: [] })}</div>,
  Geography: () => <div data-testid="geography" />,
  ZoomableGroup: ({ children }) => <div data-testid="zoomable-group">{children}</div>,
}))

