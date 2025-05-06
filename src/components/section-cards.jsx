'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import Loader from '@/components/loader'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchMetrics } from '@/lib/requests'

const metrics = [
  {
    label: 'Total Applicants',
    value: 124,
    trend: '+18%',
    direction: 'up',
    status: 'Trending upward',
    description: 'New resumes received in the last 30 days',
  },
  {
    label: 'AI-Scored Candidates',
    value: 98,
    trend: '+12%',
    direction: 'up',
    status: 'Scoring coverage improving',
    description: 'LLM-rated resumes based on criteria',
  },
  {
    label: 'Top Candidates',
    value: 17,
    trend: '+4.5%',
    direction: 'up',
    status: 'Ready for review',
    description: 'Applicants with Elo score > 1100',
  },
  {
    label: 'Pending Human Review',
    value: 6,
    trend: '-8%',
    direction: 'down',
    status: 'Queue clearing slowly',
    description: 'Awaiting manual evaluator feedback',
  },
]

export function SectionCards() {
  const { data: allMetrics, isFetching } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => fetchMetrics(),
  })
  console.log(allMetrics)
  if (isFetching) return <Loader />
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 md:grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {allMetrics.map((metric) => (
        <Card key={metric.label} className="@container/card">
          <CardHeader className="relative">
            <CardDescription>{metric.label}</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {metric.value}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                {metric.direction === 'up' ? (
                  <TrendingUpIcon className="size-3" />
                ) : (
                  <TrendingDownIcon className="size-3" />
                )}
                {metric.trend}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {metric.status}{' '}
              {metric.direction === 'up' ? (
                <TrendingUpIcon className="size-4" />
              ) : (
                <TrendingDownIcon className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">{metric.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
