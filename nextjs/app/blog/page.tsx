import { getAllBlogs, generateSlug } from '@/lib/bubble-api';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Elvatix',
  description: 'Praktische tips, data-gedreven inzichten en verhalen van recruiters die slimmer werken.',
};

export default async function BlogPage() {
  let blogs;

  try {
    blogs = await getAllBlogs();
  } catch {
    blogs = [];
  }

  return (
    <main className="pt-28 pb-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recruitment insights & tips
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Praktische tips, data-gedreven inzichten en verhalen van recruiters die slimmer werken.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const slug = generateSlug(blog["SEO title"]);
              return (
                <Link
                  key={blog._id}
                  href={`/blog/${slug}`}
                  className="group block rounded-card overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 no-underline"
                >
                  {/* Image */}
                  {blog.Image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={blog.Image}
                        alt={blog["Alt text"] || blog["SEO title"]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(blog.Date).toLocaleDateString('nl-NL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {blog.Author && ` · ${blog.Author}`}
                    </p>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-linkedin transition-colors">
                      {blog["SEO title"]}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog["SEO Description"]}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Nog geen blogposts beschikbaar.</p>
          </div>
        )}
      </Container>
    </main>
  );
}
