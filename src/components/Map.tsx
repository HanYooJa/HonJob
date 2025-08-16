'use client'

import React, { useEffect, useRef } from 'react'

interface NaverMapProps {
  coords?: { lat: number; lng: number } | null
  radiusKm?: number
}

export function NaverMap({ coords, radiusKm = 5 }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const circleRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || !window.naver) return

    if (!mapInstance.current) {
      mapInstance.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(
          coords?.lat ?? 37.5665,
          coords?.lng ?? 126.978
        ),
        zoom: 12,
      })
    }

    if (coords) {
      const position = new window.naver.maps.LatLng(coords.lat, coords.lng)

      // 마커
      if (!markerRef.current) {
        markerRef.current = new window.naver.maps.Marker({
          position,
          map: mapInstance.current,
        })
      } else {
        markerRef.current.setPosition(position)
      }

      // 원 (반경)
      const radiusM = radiusKm * 1000
      if (!circleRef.current) {
        circleRef.current = new window.naver.maps.Circle({
          map: mapInstance.current,
          center: position,
          radius: radiusM,
          fillColor: 'rgba(0, 123, 255, 0.2)',
          strokeColor: '#007bff',
          strokeOpacity: 0.8,
          strokeWeight: 2,
        })
      } else {
        circleRef.current.setCenter(position)
        circleRef.current.setRadius(radiusM)
      }

      mapInstance.current.setCenter(position)
    }
  }, [coords, radiusKm])

  return <div ref={mapRef} className="w-full h-80 rounded-md border" />
}
