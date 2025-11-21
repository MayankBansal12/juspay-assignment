import { DataTable } from "@/components/orders-table/data-table";
import { orders } from "@/lib/mocks/orders";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

const OrderList = () => {
  const { setActivitySidebarOpen } = useStore();

  useEffect(() => {
    setActivitySidebarOpen(false);
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-md font-semibold mb-4">Order List</h1>
      <DataTable data={orders} />
    </div>
  )
}

export default OrderList
