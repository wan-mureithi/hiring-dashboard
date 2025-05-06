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
  ResponsiveContainer,
  Legend,
  Scatter,
  ScatterChart,
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
  const genderCount = applicants.reduce((acc, curr) => {
    acc[curr.Gender] = (acc[curr.Gender] || 0) + 1
    return acc
  }, {})

  const degreeCount = applicants.reduce((acc, curr) => {
    acc[curr.degree] = (acc[curr.degree] || 0) + 1
    return acc
  }, {})
  const genderData = Object.entries(genderCount).map(([gender, count]) => ({
    gender,
    count,
  }))
  console.log(genderData, genderCount)
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
      <div className="grid grid-cols-2 gap-2">
        <Card className="@container/card p-4">
          <h2 className="text-xl font-semibold mb-2">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderData}>
              <XAxis dataKey="gender" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
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
          <h2 className="text-lg font-semibold">
            ELO Score vs Years of Experience
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="Years of work"
                name="Years of work"
                label={{
                  value: 'Years of work',
                  position: 'insideBottom',
                  offset: -5,
                }}
              />
              <YAxis
                type="number"
                dataKey="Elo score"
                name="Elo score"
                domain={[800, 'auto']}
                label={{
                  value: 'Elo score',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />

              <Scatter
                name="Female"
                data={applicants.filter((d) => d.Gender === 'Female')}
                fill="#8884d8"
              />
              <Scatter
                name="Male"
                data={applicants.filter((d) => d.Gender === 'Male')}
                fill="#82ca9d"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

export default Page
