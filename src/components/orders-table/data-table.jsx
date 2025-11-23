import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { columns } from '@/components/orders-table/columns'
import { DataTableToolbar } from '@/components/orders-table/data-table-toolbar'

const MotionTableBody = motion(TableBody)
const MotionTableRow = motion(TableRow)

const globalFilterFn = (row, columnId, filterValue) => {
  const search = filterValue.toLowerCase()
  const order = row.original

  const searchableFields = [
    order.id?.toLowerCase() || '',
    order.user?.name?.toLowerCase() || '',
    order.project?.toLowerCase() || '',
    order.address?.toLowerCase() || '',
    order.status?.toLowerCase() || '',
  ]

  return searchableFields.some((field) => field.includes(search))
}

export function DataTable({ data, copyStates = {}, onCopyOrder }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    meta: {
      copyStates,
      onCopyOrder,
    },
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <MotionTableBody
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.04, delayChildren: 0.05 },
              },
            }}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <MotionTableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    },
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </MotionTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </MotionTableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of {table.getCoreRowModel().rows.length} row(s)
          shown.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
              .slice(0, 5)
              .map((page) => (
                <Button
                  key={page}
                  variant={
                    table.getState().pagination.pageIndex + 1 === page ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => table.setPageIndex(page - 1)}
                  className="h-8 w-8"
                >
                  {page}
                </Button>
              ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
