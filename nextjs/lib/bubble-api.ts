// lib/bubble-api.ts

interface BubbleResponse<T> {
  response: {
    results: T[];
    count: number;
    remaining: number;
  };
}

export interface Blog {
  _id: string;
  "SEO title": string;
  "SEO Description": string;
  Body: string;
  Date: string;
  Author: string;
  Image: string;
  "Alt text": string;
  slug?: string;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function fetchBubble<T>(endpoint: string): Promise<T[]> {
  const apiUrl = process.env.BUBBLE_API_URL;
  const apiKey = process.env.BUBBLE_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('Missing BUBBLE_API_URL or BUBBLE_API_KEY environment variables');
  }

  const url = `${apiUrl}/api/1.1/${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Bubble API Error: ${res.status}`);
  }

  const data: BubbleResponse<T> = await res.json();
  return data.response.results;
}

export async function getAllBlogs(): Promise<Blog[]> {
  const blogs = await fetchBubble<Blog>('obj/blog');
  return blogs.sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getAllBlogs();
  return blogs.find((b) => generateSlug(b["SEO title"]) === slug) || null;
}
