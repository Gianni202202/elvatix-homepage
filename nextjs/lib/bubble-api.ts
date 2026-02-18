// lib/bubble-api.ts

interface BubbleResponse<T> {
  response: {
    results: T[]
    count: number
    remaining: number
  }
}

export interface Blog {
  _id: string
  "SEO title": string       // Let op: kleine 't' niet Title!
  "SEO Description": string // Let op: hoofdletter 'D'!
  Body: string              // Hoofdletter B
  Date: string              // Hoofdletter D
  Author: string            // Hoofdletter A
  Image: string             // Hoofdletter I
  "Alt text": string        // Met spatie
  slug?: string             // Kan al bestaan in Bubble
}

export async function fetchBubble<T>(endpoint: string): Promise<T[]> {
  const apiUrl = process.env.BUBBLE_API_URL || 'https://app.elvatix.com'
  const apiKey = process.env.BUBBLE_API_KEY

  if (!apiKey) {
    throw new Error('BUBBLE_API_KEY is not set')
  }

  const url = `${apiUrl}/api/1.1/${endpoint}`

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    next: { revalidate: 3600 }
  })

  if (!res.ok) {
    throw new Error(`Bubble API error: ${res.status}`)
  }

  const data: BubbleResponse<T> = await res.json()
  return data.response.results
}

export async function getAllBlogs(): Promise<Blog[]> {
  const blogs = await fetchBubble<Blog>('obj/blog')

  return blogs.sort((a, b) => {
    const dateA = new Date(a.Date).getTime()
    const dateB = new Date(b.Date).getTime()
    return dateB - dateA
  })
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const constraint = encodeURIComponent(
    JSON.stringify([{
      key: "slug",
      constraint_type: "equals",
      value: slug
    }])
  )

  const blogs = await fetchBubble<Blog>(`obj/blog?constraints=${constraint}`)
  return blogs[0] || null
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
