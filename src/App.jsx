import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from '@/store/useStore'
import Layout from '@/components/Layout'
import DashboardDefault from '@/pages/DashboardDefault'
import OrderList from '@/pages/OrderList'

import { TooltipProvider } from '@/components/ui/tooltip'
import { ComingSoon } from './components/ComingSoon'

function App() {
  const theme = useStore((state) => state.theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/default" replace />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route path="default" element={<DashboardDefault />} />
            <Route path="order-list" element={<OrderList />} />
            <Route index element={<Navigate to="/dashboard/default" replace />} />
            <Route
              path="*"
              element={<ComingSoon />}
            />
          </Route>
        </Routes>
      </Router>
    </TooltipProvider>
  )
}

export default App
