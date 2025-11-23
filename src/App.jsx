import { ComingSoon } from '@/components/ComingSoon'
import Layout from '@/components/Layout'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import DashboardDefault from '@/pages/DashboardDefault'
import OrderList from '@/pages/OrderList'
import { useStore } from '@/store/useStore'
import { useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

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
            <Route path="*" element={<ComingSoon />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </TooltipProvider>
  )
}

export default App
