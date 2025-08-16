'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Crosshair,
  RefreshCcw,
  Compass,
  MoveHorizontal,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import NaverMap from './NaverMap'
import { Job } from './types'

export type LocationFilters = {
  address: string
  radiusKm: number
  coords?: { lat: number; lng: number } | null
  selectedCerts?: string[] // 자격증 필터
}

export type LocationFilterProps = {
  className?: string
  defaultAddress?: string
  defaultRadiusKm?: number
  defaultCoords?: { lat: number; lng: number } | null
  jobs: Job[]
  onApply?: (filters: LocationFilters) => void
  onReset?: () => void
  onMarkerClick?: (jobId: string) => void
}

const formatKm = (km: number) =>
  km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(km % 1 ? 1 : 0)} km`

export default function LocationFilter({
  className,
  defaultAddress = '',
  defaultRadiusKm = 5,
  defaultCoords = null,
  jobs,
  onApply,
  onReset,
  onMarkerClick,
}: LocationFilterProps) {
  const [address, setAddress] = useState<string>(defaultAddress)
  const [radiusKm, setRadiusKm] = useState<number>(defaultRadiusKm)
  const [coords, setCoords] = useState<LocationFilters['coords']>(defaultCoords)
  const [locating, setLocating] = useState<boolean>(true)
  const [selectedCerts, setSelectedCerts] = useState<string[]>([])

  const canApply = useMemo(
    () => !!address.trim() || !!coords,
    [address, coords]
  )

  // 내 위치 가져오기
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocating(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setCoords({ lat: latitude, lng: longitude })
        if (!address.trim()) setAddress('현재 위치 사용')
        setLocating(false)
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  const handleUseCurrent = useCallback(() => {
    if (!('geolocation' in navigator))
      return alert('위치 서비스를 사용할 수 없습니다.')
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setCoords({ lat: latitude, lng: longitude })
        if (!address.trim()) setAddress('현재 위치 사용')
        setLocating(false)
      },
      () => {
        alert('위치를 가져오지 못했습니다.')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [address])

  const quickSetRadius = useCallback((km: number) => setRadiusKm(km), [])

  const handleApply = useCallback(() => {
    const payload: LocationFilters = {
      address: address.trim(),
      radiusKm,
      coords,
      selectedCerts,
    }
    if (onApply) onApply(payload)
  }, [address, radiusKm, coords, selectedCerts, onApply])

  const handleReset = useCallback(() => {
    setAddress('')
    setRadiusKm(5)
    setCoords(null)
    setSelectedCerts([])
    if (onReset) onReset()
  }, [onReset])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn('w-full max-w-2xl', className)}
    >
      <Card className="border-muted shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Compass className="size-5" aria-hidden />
            <h2 className="text-xl font-semibold">위치 기반 필터</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            주소를 입력하거나 현재 위치를 사용해 반경을 지정하세요.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm">
              주소 또는 장소
            </Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예) 서울특별시 중구 세종대로 110"
                  className="pl-9"
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={handleUseCurrent}
                disabled={locating}
              >
                {locating ? (
                  <>
                    <RefreshCcw className="mr-2 size-4 animate-spin" /> 위치
                    확인 중…
                  </>
                ) : (
                  <>
                    <Crosshair className="mr-2 size-4" /> 현재 위치
                  </>
                )}
              </Button>
            </div>
            {coords && (
              <p className="text-xs text-muted-foreground">
                좌표: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="radius"
                className="text-sm flex items-center gap-2"
              >
                <MoveHorizontal className="size-4" /> 검색 반경
              </Label>
              <Badge variant="secondary" className="font-medium">
                {formatKm(radiusKm)}
              </Badge>
            </div>
            <Slider
              id="radius"
              value={[radiusKm]}
              onValueChange={(v) => setRadiusKm(Number(v[0]))}
              min={0.5}
              max={30}
              step={0.5}
            />
            <div className="flex flex-wrap gap-2">
              {[1, 3, 5, 10, 15, 20].map((km) => (
                <Button
                  key={km}
                  type="button"
                  size="sm"
                  variant={
                    Math.abs(radiusKm - km) < 0.001 ? 'default' : 'outline'
                  }
                  onClick={() => quickSetRadius(km)}
                  className="rounded-full"
                >
                  {km}km
                </Button>
              ))}
            </div>
          </div>

          {/* 자격증 필터 */}
          <div className="space-y-2">
            <Label className="text-sm">보유 자격증</Label>
            <div className="flex flex-wrap gap-2">
              {['정보처리기사', '산업기사', '컴활', 'SQLD'].map((cert) => (
                <Button
                  key={cert}
                  type="button"
                  size="sm"
                  variant={selectedCerts.includes(cert) ? 'default' : 'outline'}
                  onClick={() =>
                    setSelectedCerts((prev) =>
                      prev.includes(cert)
                        ? prev.filter((c) => c !== cert)
                        : [...prev, cert]
                    )
                  }
                  className="rounded-full"
                >
                  {cert}
                </Button>
              ))}
            </div>
          </div>

          {coords && (
            <div className="h-[400px] w-full mt-4">
              <NaverMap
                lat={coords.lat}
                lng={coords.lng}
                jobs={jobs}
                onMarkerClick={onMarkerClick}
              />
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2">
          <div className="text-xs text-muted-foreground">
            ※ 지도와 위치 자동 표시
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={handleReset}>
              초기화
            </Button>
            <Button type="button" onClick={handleApply} disabled={!canApply}>
              필터 적용
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
