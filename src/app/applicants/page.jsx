'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/data-table'
import { fetchApplicants } from '@/lib/requests'
import Loader from '@/components/loader'

function Page() {
  const { data: allApplicants, isFetching } = useQuery({
    queryKey: ['applicants'],
    queryFn: () => fetchApplicants(),
  })
  if (isFetching) return <Loader />
  return (
    <div>
      <DataTable data={allApplicants} />
    </div>
  )
}

export default Page
