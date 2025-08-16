import { NextRequest, NextResponse } from 'next/server'

const allJobs = [
  {
    jobId: '1',
    company: '회사A',
    position: '프론트엔드 개발자',
    description: '회사A 상세 설명...',
    distance: '2.3km',
    isRemote: true,
  },
  {
    jobId: '2',
    company: '회사B',
    position: '백엔드 개발자',
    description: '회사B 상세 설명...',
    distance: '3.8km',
    isRemote: false,
  },
  {
    jobId: '3',
    company: '회사C',
    position: '디자이너',
    description: '회사C 상세 설명...',
    distance: '1.1km',
    isRemote: true,
  },
  {
    jobId: '4',
    company: '쿠팡',
    position: '풀스택 개발자',
    description: '쿠팡 상세 설명...',
    distance: '1.5km',
    isRemote: true,
  },
]

interface Params {
  jobId: string
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  const { jobId } = await context.params

  const job = allJobs.find((j) => j.jobId === jobId)
  if (!job) {
    return NextResponse.json(
      { message: '공고를 찾을 수 없습니다.' },
      { status: 404 }
    )
  }

  return NextResponse.json(job)
}
