export type ExperienceType = '신입' | '경력' | '경력무관'

export interface Job {
  certificates: any
  jobId: string
  company: string
  position: string
  description?: string
  lat: number
  lng: number
  distance: string
  isRemote: boolean
  startDate?: string
  endDate?: string
  requiredCerts?: string[]
  experience?: ExperienceType
}
