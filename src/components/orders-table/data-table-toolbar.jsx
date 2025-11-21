import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Filter, Plus, Search, X } from "lucide-react"
import { useEffect, useState } from "react"

const statuses = ["In Progress", "Complete", "Pending", "Approved", "Rejected"]

export function DataTableToolbar({ table }) {
  const columnFilters = table.getState().columnFilters
  const globalFilter = table.getState().globalFilter || ""
  const statusFilter = columnFilters.find((filter) => filter.id === "status")?.value || []
  const [selectedStatuses, setSelectedStatuses] = useState(statusFilter)

  useEffect(() => {
    const currentFilter = columnFilters.find((filter) => filter.id === "status")?.value || []
    setSelectedStatuses(Array.isArray(currentFilter) ? currentFilter : [])
  }, [columnFilters])

  const isFiltered = columnFilters.length > 0 || globalFilter.length > 0

  const handleStatusToggle = (status) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status]

    setSelectedStatuses(newStatuses)

    if (newStatuses.length > 0) {
      table.getColumn("status").setFilterValue(newStatuses)
    } else {
      table.getColumn("status").setFilterValue(undefined)
    }
  }

  const clearFilters = () => {
    setSelectedStatuses([])
    table.resetColumnFilters()
    table.setGlobalFilter("")
  }

  return (
    <div className="flex items-center justify-between gap-2 py-4">
      <div className="flex flex-1 items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleStatusToggle(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowUpDown className="h-4 w-4" />
          <span className="sr-only">Sort</span>
        </Button>

        <div className="bg-secondary rounded-md relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="pl-8 h-8"
          />
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
