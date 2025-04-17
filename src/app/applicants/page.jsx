'use client'
import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/data-table'
import data from './data.json'
import { fetchApplicants } from '@/lib/requests'

function Page() {
  const { data: allApplicants, isFetching } = useQuery({
    queryKey: ['applicants'],
    queryFn: () => fetchApplicants(),
  })
  if (isFetching) return <div>Loading</div>
  return (
    <div>
      <DataTable data={allApplicants} />
    </div>
  )
}

export default Page
