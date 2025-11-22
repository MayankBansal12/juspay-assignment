import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TrendingDown, TrendingUp } from 'lucide-react'
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
  {
    title: 'Customers', value: '3,781', change: '+11.01%', isPositive: true, bgColor: 'bg-card',
    textColor: 'text-[var(--black-100)]'
  },
  { title: 'Orders', value: '1,219', change: '-0.03%', isPositive: false },
  { title: 'Revenue', value: '$695', change: '+15.03%', isPositive: true },
  {
    title: 'Growth', value: '30.1%', change: '+6.08%', isPositive: true,
    bgColor: 'bg-card-foreground',
    textColor: 'text-[var(--black-100)]'
  },
]

const projectionsData = [
  { month: 'Jan', projections: 14, actuals: 5 },
  { month: 'Feb', projections: 18, actuals: 4 },
  { month: 'Mar', projections: 15, actuals: 6 },
  { month: 'Apr', projections: 16, actuals: 5 },
  { month: 'May', projections: 12, actuals: 5 },
  { month: 'Jun', projections: 18, actuals: 4 },
]

const revenueTrendData = [
  { name: 'Jan', prevWeek: 7, currentWeekSolid: 12, currentWeekDotted: null, currentWeek: 12 },
  { name: 'Feb', prevWeek: 19, currentWeekSolid: 9, currentWeekDotted: null, currentWeek: 9 },
  { name: 'Mar', prevWeek: 15, currentWeekSolid: 11, currentWeekDotted: null, currentWeek: 11 },
  { name: 'Apr', prevWeek: 12, currentWeekSolid: 15, currentWeekDotted: 15, currentWeek: 15 },
  { name: 'May', prevWeek: 10.5, currentWeekSolid: null, currentWeekDotted: 19.5, currentWeek: 19.5 },
  { name: 'Jun', prevWeek: 22, currentWeekSolid: null, currentWeekDotted: 17.5, currentWeek: 17.5 },
]

const totalPrevWeek = revenueTrendData.reduce((sum, item) => sum + (item.prevWeek || 0), 0)
const totalCurrentWeek = revenueTrendData.reduce((sum, item) => sum + (item.currentWeek || 0), 0)

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
  { name: 'Direct', value: 300.56, color: '#C6C7F8' },
  { name: 'Affiliate', value: 135.10, color: '#BAEDBD' },
  { name: 'Sponsored', value: 154.02, color: '#95A4FC' },
  { name: 'E-mail', value: 48.96, color: '#B1E3FF' },
]

const totalSales = salesData.reduce((sum, item) => sum + item.value, 0)
const salesDataWithPercentage = salesData.map((item) => ({
  ...item,
  percentage: ((item.value / totalSales) * 100).toFixed(1),
}))

const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0]?.payload
    const prevWeekValue = dataPoint?.prevWeek
    const currentWeekValue = dataPoint?.currentWeek ?? dataPoint?.currentWeekSolid ?? dataPoint?.currentWeekDotted

    return (
      <div
        style={{
          backgroundColor: 'hsl(var(--secondary))',
          border: '1px solid hsl(var(--border))',
          fontSize: '12px',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '8px',
        }}
      >
        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}>{label}</p>
        {prevWeekValue !== null && prevWeekValue !== undefined && (
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            Previous Week: {prevWeekValue}M
          </p>
        )}
        {currentWeekValue !== null && currentWeekValue !== undefined && (
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            Current Week: {currentWeekValue}M
          </p>
        )}
      </div>
    )
  }
  return null
}

const DashboardDefault = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="font-semibold mb-4">eCommerce</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {kpiData.map((kpi) => (
            <Tooltip key={kpi.title}>
              <TooltipTrigger asChild>
                <div
                  className={`
                    ${kpi.bgColor ?? 'bg-secondary'}
                    ${kpi.textColor ?? 'text-foreground'}
                    rounded-lg h-fit md:h-[115px] p-4 lg:p-6 flex flex-col gap-2 overflow-hidden cursor-default
                  `}
                >
                  <p className="text-sm font-semibold">{kpi.title}</p>

                  <div className="flex justify-between items-center gap-4">
                    <p className="text-2xl font-semibold">{kpi.value}</p>
                    <p className="text-xs flex items-center gap-1">
                      <span>{kpi.change}</span>
                      {!!kpi.isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4 rotate-[105deg]" />
                      )}
                    </p>
                  </div>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p>{kpi.title}: {kpi.value}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="bg-secondary h-fit md:h-[252px] flex flex-col gap-4 rounded-lg p-4 lg:p-6">
          <h2 className="text-sm font-semibold">Projections vs Actuals</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={projectionsData}>
              <CartesianGrid
                strokeDasharray=""
                stroke="hsl(var(--muted-foreground))"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                width={32}
                ticks={[0, 10, 20, 30]}
                domain={[0, 30]}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={1}
                style={{ fontSize: '12px' }}
                tickFormatter={(v) => `${v}M`}
                tickLine={false}
                axisLine={false}
              />
              <RechartsTooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: 'hsl(var(--secondary))',
                  border: '1px solid hsl(var(--border))',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground px-0 lg:px-1">{value}</span>
                )}
              />
              <Bar
                dataKey="projections"
                name="Projections"
                stackId="a"
                radius={[0, 0, 0, 0]}
                barSize={20}
                fill="hsl(var(--chart-1))"
              />
              <Bar
                dataKey="actuals"
                name="Actuals"
                stackId="a"
                radius={[4, 4, 0, 0]}
                barSize={20}
                fill="hsl(var(--chart-2))"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="bg-secondary h-fit md:h-[318px] flex flex-col gap-4 rounded-lg p-4 lg:p-6 xl:col-span-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-sm font-semibold">Revenue</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-xs text-muted-foreground">
                  Current Week <span className="text-primary font-semibold">${(totalCurrentWeek * 1000000).toLocaleString()}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--line-chart))]"></div>
                <span className="text-xs text-muted-foreground">
                  Previous Week <span className="text-primary font-semibold">${(totalPrevWeek * 1000000).toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid
                strokeDasharray=""
                stroke="hsl(var(--muted-foreground))"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                width={32}
                ticks={[0, 10, 20, 30]}
                domain={[0, 30]}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={1}
                style={{ fontSize: '12px' }}
                tickFormatter={(v) => `${v}M`}
                tickLine={false}
                axisLine={false}
              />
              <RechartsTooltip
                cursor={false}
                content={<RevenueTooltip />}
              />
              <Line
                type="monotone"
                dataKey="prevWeek"
                name="Previous Week"
                stroke="hsl(var(--line-chart))"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="currentWeekSolid"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="currentWeekDotted"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                strokeDasharray="8 5"
                dot={false}
                connectNulls={true}
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

        <div className="bg-secondary p-4 lg:p-6 rounded-lg flex flex-col gap-4 justify-start">
          <h2 className="text-sm font-semibold">Total Sales</h2>
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full">
              <ResponsiveContainer height={150}>
                <PieChart>
                  <Pie
                    data={salesDataWithPercentage}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {salesDataWithPercentage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--secondary))',
                      border: '1px solid hsl(var(--border))',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                    }}
                    formatter={(value, name) => {
                      const dataEntry = salesDataWithPercentage.find(
                        (entry) => entry.name === name && entry.value === value
                      );
                      if (dataEntry && dataEntry.percentage) {
                        return [`${dataEntry.name}: ${dataEntry.percentage}%`];
                      }
                      return [`${name}: $${value.toFixed(2)}`];
                    }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                    itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {salesDataWithPercentage.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold">${item.value.toFixed(2)}</span>
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
