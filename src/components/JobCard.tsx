'use client'

import { useRouter } from 'next/navigation'

interface JobCardProps {
  jobId: string
  company: string
  position: string
  distance: string
  isRemote: boolean
  startDate?: string
  endDate?: string
}

export function JobCard({
  jobId,
  company,
  position,
  distance,
  isRemote,
  startDate,
  endDate,
}: JobCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const prev = JSON.parse(
        localStorage.getItem('recentJobs') || '[]'
      ) as string[]
      const filtered = prev.filter((id) => id !== jobId)
      const newList = [jobId, ...filtered].slice(0, 10)
      localStorage.setItem('recentJobs', JSON.stringify(newList))
    }
    router.push(`/jobs/${jobId}`)
  }

  return (
    <article
      onClick={handleClick}
      className="mb-4 p-4 border rounded shadow-sm cursor-pointer hover:bg-blue-50"
    >
      <h3 className="font-bold text-lg">{company}</h3>
      <p className="text-gray-600">{position}</p>
      <p className="text-sm text-gray-500 mt-1">
        거리: {distance} · {isRemote ? '재택 가능' : '출근 필요'}
      </p>
      {startDate && endDate && (
        <p className="text-xs text-gray-400 mt-1">
          공고 기간: {startDate} ~ {endDate}
        </p>
      )}
    </article>
  )
}
