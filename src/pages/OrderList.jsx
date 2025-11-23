import { DataTable } from '@/components/orders-table/data-table'
import { orders } from '@/lib/mocks/orders'
import { useStore } from '@/store/useStore'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

const OrderList = () => {
  const { setActivitySidebarOpen } = useStore()
  const [copyStates, setCopyStates] = useState({})
  const copyTimersRef = useRef({})

  useEffect(() => {
    setActivitySidebarOpen(false)
  }, [])

  useEffect(() => {
    return () => {
      Object.values(copyTimersRef.current).forEach((timers) => {
        if (timers.loading) clearTimeout(timers.loading)
        if (timers.success) clearTimeout(timers.success)
      })
    }
  }, [])

  const handleCopyOrder = async (orderId) => {
    const copyText = orderId ?? ''

    if (!copyText) return

    const clearExistingTimers = () => {
      const existing = copyTimersRef.current[orderId]
      if (existing) {
        if (existing.loading) clearTimeout(existing.loading)
        if (existing.success) clearTimeout(existing.success)
      }
    }

    clearExistingTimers()

    setCopyStates((prev) => ({ ...prev, [orderId]: 'loading' }))

    try {
      await navigator.clipboard.writeText(copyText)
    } catch (error) {
      toast.error('Unable to copy order ID')
      setCopyStates((prev) => ({ ...prev, [orderId]: 'idle' }))
      return
    }

    const loadingTimer = setTimeout(() => {
      setCopyStates((prev) => ({ ...prev, [orderId]: 'success' }))

      const successTimer = setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [orderId]: 'idle' }))
      }, 3000)

      copyTimersRef.current[orderId] = {
        ...(copyTimersRef.current[orderId] || {}),
        success: successTimer,
      }
    }, 1000)

    copyTimersRef.current[orderId] = {
      loading: loadingTimer,
    }
  }

  return (
    <motion.div
      className="p-4 space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
      }}
    >
      <motion.h1 className="text-md font-semibold" variants={fadeInUp}>
        Order List
      </motion.h1>
      <motion.div variants={fadeInUp}>
        <DataTable data={orders} copyStates={copyStates} onCopyOrder={handleCopyOrder} />
      </motion.div>
    </motion.div>
  )
}

export default OrderList
