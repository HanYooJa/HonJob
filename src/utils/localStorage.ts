export function saveRecentlyViewed(jobId: string) {
  if (typeof window === 'undefined') return

  const prev = JSON.parse(
    localStorage.getItem('recentJobs') || '[]'
  ) as string[]
  const filtered = prev.filter((id) => id !== jobId)
  const newList = [jobId, ...filtered].slice(0, 10)
  localStorage.setItem('recentJobs', JSON.stringify(newList))
}

export function getRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('recentJobs') || '[]')
}
