import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'HonJob - 위치 기반 출퇴근 최적화 채용 플랫폼',
  description: '내 위치, 출퇴근 시간에 맞는 채용 정보 찾기',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 네이버 지도 SDK - 콜백 방식 */}
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&callback=initNaverMap`}
          strategy="beforeInteractive"
        />
        <Script
          id="naver-map-auth-failure-handler"
          strategy="beforeInteractive"
        >
          {`
            window.navermap_authFailure = function () {
              alert("네이버 지도 인증에 실패했습니다. 클라이언트 아이디와 도메인을 확인해주세요.");
            };

            // 콜백에서 아무 작업도 하지 않고, 지도 컴포넌트에서 로딩 시점에 window.naver가 있는지 확인만 함
            function initNaverMap() {
              // init 함수는 콜백 필수지만, 우리는 컴포넌트에서 지도를 제어하므로 여기선 아무 작업도 안함
              console.log("NAVER Map SDK 로딩 완료");
            }
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}
