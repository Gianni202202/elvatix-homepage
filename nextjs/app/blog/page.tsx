// app/blog/page.tsx
import { getAllBlogs, generateSlug } from '@/lib/bubble-api'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'

export const metadata = {
  title: 'Recruitment Blog | Elvatix',
  description: 'LinkedIn recruitment tips en strategieen'
}

export const revalidate = 3600

export default async function BlogPage() {
  let blogs;

  try {
    blogs = await getAllBlogs()
  } catch {
    blogs = []
  }

  return (
    <main className="pt-32 pb-16">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">
            Blog
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Recruitment Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tips, trends en best practices voor recruiters
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const slug = blog.slug || generateSlug(blog["SEO title"])

              return (
                <Link
                  key={blog._id}
                  href={`/blog/${slug}`}
                  className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-linkedin transition-all no-underline"
                >
                  {blog.Image && (
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={blog.Image}
                        alt={blog["SEO title"]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <time className="text-sm text-gray-500">
                      {new Date(blog.Date).toLocaleDateString('nl-NL')}
                    </time>

                    <h2 className="text-xl font-bold mt-2 mb-3 group-hover:text-linkedin line-clamp-2 text-gray-900">
                      {blog["SEO title"]}
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog["SEO Description"]}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Nog geen blogposts beschikbaar.</p>
          </div>
        )}
      </Container>
    </main>
  )
}
