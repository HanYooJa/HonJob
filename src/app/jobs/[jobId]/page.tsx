'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Job {
  jobId: string
  company: string
  position: string
  description: string
  distance: string
  isRemote: boolean
  experience?: '신입' | '경력' | '경력무관'
}

export default function JobDetail() {
  const { jobId } = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobId) return

    setLoading(true)
    setError(null)

    fetch(`/api/jobs/${jobId}`)
      .then((res) => {
        if (!res.ok)
          throw new Error('데이터를 가져오는 중 오류가 발생했습니다.')
        return res.json()
      })
      .then((data) => {
        setJob(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [jobId])

  if (loading) return <p>로딩 중...</p>
  if (error) return <p className="text-red-600">에러: {error}</p>
  if (!job) return <p>채용 공고를 찾을 수 없습니다.</p>

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <button
        className="mb-6 text-blue-600 underline"
        onClick={() => router.back()}
      >
        ← 뒤로가기
      </button>

      <h1 className="text-3xl font-bold mb-4">
        {job.company} - {job.position}
      </h1>

      <p className="mb-2">거리: {job.distance}</p>
      <p className="mb-2">
        근무 형태: {job.isRemote ? '재택 가능' : '출근 필요'}
      </p>
      {job.experience && <p className="mb-2">경력: {job.experience}</p>}

      <p className="mt-6 whitespace-pre-wrap">{job.description}</p>
    </main>
  )
}
