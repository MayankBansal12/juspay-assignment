import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

const kpiData = [
  { title: 'Customers', value: '3,781', change: '+11.01%', isPositive: true },
  { title: 'Orders', value: '1,219', change: '-0.03%', isPositive: false },
  { title: 'Revenue', value: '$695', change: '+15.03%', isPositive: true },
  { title: 'Growth', value: '30.1%', change: '+6.08%', isPositive: true },
]

const projectionsData = [
  { month: 'Jan', projections: 15, actuals: 5 },
  { month: 'Feb', projections: 18, actuals: 4 },
  { month: 'Mar', projections: 15, actuals: 5 },
  { month: 'Apr', projections: 20, actuals: 3 },
  { month: 'May', projections: 12, actuals: 5 },
  { month: 'Jun', projections: 18, actuals: 4 },
]

const revenueTrendData = [
  { month: 'Jan', currentWeek: 10, previousWeek: 15 },
  { month: 'Feb', currentWeek: 5, previousWeek: 10 },
  { month: 'Mar', currentWeek: 10, previousWeek: 15 },
  { month: 'Apr', currentWeek: 8, previousWeek: 12 },
  { month: 'May', currentWeek: 15, previousWeek: 20 },
  { month: 'Jun', currentWeek: 20, previousWeek: 25 },
]

const locationData = [
  { city: 'New York', revenue: '72K' },
  { city: 'San Francisco', revenue: '39K' },
  { city: 'Sydney', revenue: '25K' },
  { city: 'Singapore', revenue: '61K' },
]

const topProductsData = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
  { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' },
]

const salesData = [
  { name: 'Direct', value: 300.56, color: '#10b981' },
  { name: 'Affiliate', value: 135.10, color: '#3b82f6' },
  { name: 'Sponsored', value: 154.02, color: '#8b5cf6' },
  { name: 'E-mail', value: 48.96, color: '#f59e0b' },
]

const totalSales = salesData.reduce((sum, item) => sum + item.value, 0)
const salesDataWithPercentage = salesData.map((item) => ({
  ...item,
  percentage: ((item.value / totalSales) * 100).toFixed(1),
}))

const largestSegment = salesDataWithPercentage.reduce((max, item) =>
  parseFloat(item.percentage) > parseFloat(max.percentage) ? item : max
)

const DashboardDefault = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="font-semibold mb-4">eCommerce</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kpiData.map((kpi) => (
            <Tooltip key={kpi.title}>
              <TooltipTrigger asChild>
                <div className="bg-secondary rounded-lg h-[115px] p-4 lg:p-6">
                  <p className="text-md mb-2">{kpi.title}</p>
                  <p className="text-2xl font-semibold mb-1">{kpi.value}</p>
                  <p className="text-xs">
                    {kpi.change}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{kpi.title}: {kpi.value}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="bg-secondary h-[252px] flex flex-col gap-4 rounded-lg p-4">
          <h2 className="text-md font-semibold">Projections vs Actuals</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={projectionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}M`}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--secondary))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="projections" stackId="a" fill="#a8c5da" name="Projections" />
              <Bar dataKey="actuals" stackId="a" fill="#677580" name="Actuals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="bg-secondary flex flex-col gap-4 rounded-lg p-4 xl:col-span-3">
          <h2 className="text-md font-semibold mb-4">Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}M`}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="currentWeek"
                stroke="#a8c5da"
                strokeWidth={2}
                name="Current Week $50,211"
                dot={{ fill: '#a8c5da', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="previousWeek"
                stroke="#a8c5da"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Previous Week $68,768"
                dot={{ fill: '#a8c5da', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-secondary p-4 sm:p-6 rounded-lg flex flex-col gap-4 justify-start">
          <h2 className="text-md font-semibold mb-4">Revenue by Location</h2>
          <div className="flex flex-col gap-4">
            <div className="flex-1 h-48 bg-muted rounded-lg flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">World Map</p>
                <p className="text-xs mt-1">Location visualization</p>
              </div>
            </div>

            <div className="space-y-3 lg:w-48">
              {locationData.map((location) => (
                <div key={location.city} className="flex justify-between items-center">
                  <span className="text-md text-foreground">{location.city}</span>
                  <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-100 ease-out"></div>
                  </div>
                  <span className="text-md font-semibold">{location.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="bg-secondary flex flex-col gap-4 rounded-lg p-6 xl:col-span-3">
          <h2 className="text-md font-semibold mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-md">Name</TableHead>
                  <TableHead className="text-md">Price</TableHead>
                  <TableHead className="text-md">Quantity</TableHead>
                  <TableHead className="text-md">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProductsData.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-md">{product.name}</TableCell>
                    <TableCell className="text-md">{product.price}</TableCell>
                    <TableCell className="text-md">{product.quantity}</TableCell>
                    <TableCell className="text-md">{product.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-secondary p-4 sm:p-6 rounded-lg flex flex-col gap-4 justify-start">
          <h2 className="text-md font-semibold mb-4">Total Sales</h2>
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full max-w-[250px]">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={salesDataWithPercentage}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {salesDataWithPercentage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `$${value.toFixed(2)}`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-2xl font-semibold">{largestSegment?.percentage}%</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 w-full lg:w-auto">
              {salesDataWithPercentage.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-md text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-md font-semibold">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardDefault
