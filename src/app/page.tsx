'use client'

import { useState, useEffect } from 'react'
import NaverMap from '@/components/NaverMap'
import JobCard from '@/components/JobCard'
import { useRouter } from 'next/navigation'

const allJobs = [
  {
    jobId: '1',
    company: '회사A',
    position: '프론트엔드 개발자',
    lat: 37.4979,
    lng: 127.0276,
    isRemote: true,
    distance: '2.3km',
  },
  {
    jobId: '2',
    company: '회사B',
    position: '백엔드 개발자',
    lat: 37.501,
    lng: 127.03,
    isRemote: false,
    distance: '3.8km',
  },
  {
    jobId: '3',
    company: '회사C',
    position: '디자이너',
    lat: 37.4995,
    lng: 127.0285,
    isRemote: true,
    distance: '1.1km',
  },
]

export default function HomePage() {
  const router = useRouter()
  const [userLat, setUserLat] = useState<number>(37.4979) // 기본값 서울 강남 근처
  const [userLng, setUserLng] = useState<number>(127.0276)
  const [locationLoaded, setLocationLoaded] = useState(false)
  const [locationError, setLocationError] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude)
          setUserLng(pos.coords.longitude)
          setLocationLoaded(true)
        },
        (err) => {
          console.error('위치 정보 불러오기 실패:', err)
          setLocationError(true)
          setLocationLoaded(true)
        }
      )
    } else {
      setLocationError(true)
      setLocationLoaded(true)
    }
  }, [])

  const handleMarkerClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`)
  }

  return (
    <main className="flex min-h-screen">
      {/* 좌측: 지도 영역 */}
      <div className="w-1/2 h-screen">
        {locationLoaded ? (
          <NaverMap
            lat={userLat}
            lng={userLng}
            jobs={allJobs}
            onMarkerClick={handleMarkerClick}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            위치 정보를 불러오는 중입니다...
          </div>
        )}
        {locationError && (
          <p className="text-red-600 text-center mt-2">
            위치 정보를 불러오지 못했습니다. 기본 위치로 표시됩니다.
          </p>
        )}
      </div>

      {/* 우측: 채용 리스트 영역 */}
      <div className="w-1/2 p-6 overflow-y-auto bg-white">
        <h2 className="text-2xl font-semibold mb-6">채용 공고 리스트</h2>
        {allJobs.map((job) => (
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
