import { DataTable } from '@/components/orders-table/data-table'
import { orders } from '@/lib/mocks/orders'
import { useStore } from '@/store/useStore'
import { motion } from 'motion/react'
import { useEffect } from 'react'

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

  useEffect(() => {
    setActivitySidebarOpen(false)
  }, [])

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
        <DataTable data={orders} />
      </motion.div>
    </motion.div>
  )
}

export default OrderList
