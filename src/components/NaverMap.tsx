'use client'

import { useEffect, useRef } from 'react'

interface Job {
  jobId: string
  company: string
  position: string
  lat: number
  lng: number
}

interface NaverMapProps {
  lat: number
  lng: number
  jobs: Job[]
  onMarkerClick: (jobId: string) => void
}

declare global {
  interface Window {
    naver: any
  }
}

export default function NaverMap({
  lat,
  lng,
  jobs,
  onMarkerClick,
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!window.naver || !mapRef.current) return

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // 지도 초기화 (이미 있으면 센터만 변경)
    if (!mapInstance.current) {
      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: 13,
      })
    } else {
      mapInstance.current.setCenter(new window.naver.maps.LatLng(lat, lng))
    }

    // 내 위치 마커
    const userMarker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: mapInstance.current,
      title: '내 위치',
      icon: {
        content: '<div style="color:blue;font-weight:bold;">📍내 위치</div>',
      },
    })
    markersRef.current.push(userMarker)

    // 공고별 마커 생성
    jobs.forEach((job) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(job.lat, job.lng),
        map: mapInstance.current,
        title: job.company,
      })

      // ✅ 마커 클릭 이벤트 수정
      window.naver.maps.Event.addListener(marker, 'click', () => {
        onMarkerClick(job.jobId)
      })

      markersRef.current.push(marker)
    })
  }, [lat, lng, jobs, onMarkerClick])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
    />
  )
}
