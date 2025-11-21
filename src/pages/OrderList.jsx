import { DataTable } from "@/components/orders-table/data-table"
import { orders } from "@/lib/mocks/orders"

const OrderList = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Order List</h1>
      </div>
      <DataTable data={orders} />
    </div>
  )
}

export default OrderList
