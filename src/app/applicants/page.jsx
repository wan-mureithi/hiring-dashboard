'use client'
import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/data-table'
import data from './data.json'
import { fetchApplicants } from '@/lib/requests'

function Page() {
  const { data: allApplicants, isLoading } = useQuery({
    queryKey: ['applicants'],
    queryFn: () => fetchApplicants(),
  })
  console.log(allApplicants)
  return (
    <div>
      <DataTable data={allApplicants} />
    </div>
  )
}

export default Page
