'use client'
import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { fetchApplicants } from '@/lib/requests'
import { Card } from '@/components/ui/card'
import Loader from '@/components/loader'

export const COLORS = [
  '#F4A261', // soft orange
  '#E76F51', // terracotta
  '#E9C46A', // warm yellow
  '#F28482', // coral pink
  '#FFADAD', // soft rose
  '#FFB4A2', // blush
  '#FCD5CE', // light apricot
  '#E5989B', // dusty pink
  '#F6BD60', // mango
  '#F7B267', // peach
]

function Page() {
  const { data: applicants, isFetching } = useQuery({
    queryKey: ['applicants'],
    queryFn: () => fetchApplicants(),
  })
  if (isFetching) return <Loader />
  const genderData = Object.entries(
    applicants.reduce((acc, a) => {
      acc[a.Gender] = (acc[a.Gender] || 0) + 1
      return acc
    }, {})
  ).map(([key, value]) => ({ name: key, value }))

  const degreeData = Object.entries(
    applicants.reduce((acc, a) => {
      acc[a['Highest degree']] = (acc[a['Highest degree']] || 0) + 1
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const experienceData = Object.entries(
    applicants.reduce((acc, a) => {
      acc[a['Years of work']] = (acc[a['Years of work']] || 0) + 1
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const cvRatingData = Object.entries(
    applicants.reduce((acc, a) => {
      const bucket = Math.floor(a['CV rating'] / 10) * 10 // e.g. 60–69
      acc[bucket] = (acc[bucket] || 0) + 1
      return acc
    }, {})
  ).map(([name, value]) => ({ name: `${name}–${+name + 9}`, value }))

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-2xl font-bold">📊 Applicant Visuals</h1>
      <div className="grid grid-cols-2 gap-2">
        <Card className="@container/card p-4">
          <h2 className="text-xl font-semibold mb-2">Gender Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {genderData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>
        <Card className="@container/card p-4">
          <h2 className="text-xl font-semibold mb-2">Degree Frequency</h2>
          <BarChart width={500} height={300} data={degreeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </Card>
        <Card className="@container/card p-4">
          <h2 className="text-xl font-semibold mb-2 ">
            Work Experience Histogram
          </h2>
          <BarChart width={500} height={300} data={experienceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </Card>
        <Card className="@container/card p-4">
          <h2 className="text-xl font-semibold mb-2">CV Rating Histogram</h2>
          <BarChart width={500} height={300} data={cvRatingData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#ffc658" />
          </BarChart>
        </Card>
      </div>
    </div>
  )
}

export default Page
