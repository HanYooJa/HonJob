'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import LocationFilter from '@/components/LocationFilter'
import { Job } from '@/components/types'
import { JobCard } from '@/components/JobCard'

export default function HomePage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([
    {
      jobId: '1',
      company: '회사A',
      position: '프론트엔드',
      lat: 37.4979,
      lng: 127.0276,
      distance: '2.3km',
      isRemote: true,
      certificates: ['정보처리기사'],
    },
    {
      jobId: '2',
      company: '회사B',
      position: '백엔드',
      lat: 37.5,
      lng: 127.03,
      distance: '3.8km',
      isRemote: false,
      certificates: undefined,
    },
    {
      jobId: '3',
      company: '회사C',
      position: '디자이너',
      lat: 37.495,
      lng: 127.025,
      distance: '1.1km',
      isRemote: true,
      certificates: undefined,
    },
    {
      jobId: '4',
      company: '쿠팡',
      position: '풀스택',
      lat: 37.498,
      lng: 127.029,
      distance: '0.9km',
      isRemote: false,
      certificates: ['컴활'],
    },
  ])

  const handleApplyFilters = (filters: any) => {
    console.log('필터 적용:', filters)
    // 필터 로직 구현 가능
  }

  const handleMarkerClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`)
  }

  return (
    <main className="p-6">
      <LocationFilter
        jobs={jobs}
        onApply={handleApplyFilters}
        onMarkerClick={handleMarkerClick}
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard
            key={job.jobId}
            jobId={job.jobId}
            company={job.company}
            position={job.position}
            distance={job.distance}
            isRemote={job.isRemote}
          />
        ))}
      </div>
    </main>
  )
}
