'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Loader from '@/components/loader'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { fetchApplicants } from '@/lib/requests'
export const chartData = [
  { date: '2024-03-01', applicants: 9 },
  { date: '2024-03-02', applicants: 16 },
  { date: '2024-03-03', applicants: 18 },
  { date: '2024-03-04', applicants: 14 },
  { date: '2024-03-05', applicants: 12 },
  { date: '2024-03-06', applicants: 14 },
  { date: '2024-03-07', applicants: 2 },
  { date: '2024-03-08', applicants: 4 },
  { date: '2024-03-09', applicants: 1 },
  { date: '2024-03-10', applicants: 2 },
]

const chartConfig = {
  applicants: {
    label: 'Applicants',
    color: 'hsl(var(--chart-1))',
  },
}

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState('60d')
  const { data: allApplicants, isFetching } = useQuery({
    queryKey: ['applicants'],
    queryFn: () => fetchApplicants(),
  })

  const newChartdata = allApplicants
    ? Object.values(
        allApplicants?.reduce((acc, applicant) => {
          const date = applicant['Date applied']
          if (!date) return acc

          if (!acc[date]) {
            acc[date] = { date, applicants: 0 }
          }

          acc[date].applicants += 1
          return acc
        }, {})
      ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : null

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })
  console.log(allApplicants)
  console.log(newChartdata)
  if (isFetching) return <Loader />
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Applications</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last month
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        {/* <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={newChartdata}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="applicants"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
