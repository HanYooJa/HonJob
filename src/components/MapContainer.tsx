'use client'

import NaverMap from './NaverMap'
import { Job } from './types'

interface MapContainerProps {
  jobs: Job[]
  onMarkerClick?: (jobId: string) => void
}

export default function MapContainer({
  jobs,
  onMarkerClick,
}: MapContainerProps) {
  if (jobs.length === 0) return <p>조건에 맞는 공고가 없습니다.</p>

  const defaultLat = jobs[0].lat
  const defaultLng = jobs[0].lng

  return (
    <NaverMap
      lat={defaultLat}
      lng={defaultLng}
      jobs={jobs}
      onMarkerClick={onMarkerClick}
    />
  )
}
