// app/blog/[slug]/page.tsx
import { getBlogBySlug, getAllBlogs, generateSlug } from '@/lib/bubble-api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

interface BlogDetailProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) return { title: 'Blog niet gevonden' }

  return {
    title: `${blog["SEO title"]} | Elvatix`,
    description: blog["SEO Description"],
    openGraph: {
      title: blog["SEO title"],
      description: blog["SEO Description"],
      type: 'article',
      publishedTime: blog.Date,
      images: blog.Image ? [blog.Image] : []
    }
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs()
    return blogs.map((blog) => ({
      slug: blog.slug || generateSlug(blog["SEO title"])
    }))
  } catch {
    return []
  }
}

export default async function BlogPost({ params }: BlogDetailProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) notFound()

  return (
    <main className="pt-32 pb-16">
      <Container className="max-w-4xl">
        <article>
          {blog.Image && (
            <div className="aspect-video relative rounded-2xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={blog.Image}
                alt={blog["SEO title"]}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {blog["SEO title"]}
            </h1>

            <div className="flex items-center gap-4 text-gray-600">
              <time>{new Date(blog.Date).toLocaleDateString('nl-NL')}</time>
              {blog.Author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />
                  <span>{blog.Author}</span>
                </>
              )}
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-linkedin hover:prose-a:text-linkedin-dark"
            dangerouslySetInnerHTML={{ __html: blog.Body }}
          />

          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="text-linkedin font-semibold hover:text-linkedin-dark transition-colors no-underline"
            >
              &larr; Terug naar overzicht
            </Link>
          </div>
        </article>
      </Container>
    </main>
  )
}
