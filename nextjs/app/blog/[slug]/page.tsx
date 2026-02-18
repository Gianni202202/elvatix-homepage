import { getAllBlogs, getBlogBySlug, generateSlug } from '@/lib/bubble-api';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({
      slug: generateSlug(blog["SEO title"]),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog niet gevonden | Elvatix',
    };
  }

  return {
    title: `${blog["SEO title"]} | Elvatix`,
    description: blog["SEO Description"],
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <main className="pt-28 pb-20">
        <Container className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog niet gevonden</h1>
          <p className="text-gray-600 mb-8">Dit artikel bestaat niet of is verwijderd.</p>
          <Link
            href="/blog"
            className="text-linkedin hover:text-linkedin-dark font-semibold transition-colors"
          >
            ← Terug naar blog overzicht
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20">
      <Container className="max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-linkedin transition-colors mb-8 no-underline"
        >
          ← Terug naar blog overzicht
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {blog["SEO title"]}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <time>
              {new Date(blog.Date).toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {blog.Author && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{blog.Author}</span>
              </>
            )}
          </div>
        </header>

        {/* Hero Image */}
        {blog.Image && (
          <div className="relative w-full h-64 md:h-96 rounded-card overflow-hidden mb-10">
            <Image
              src={blog.Image}
              alt={blog["Alt text"] || blog["SEO title"]}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Body */}
        <div
          dangerouslySetInnerHTML={{ __html: blog.Body }}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-linkedin hover:prose-a:text-linkedin-dark"
        />
      </Container>
    </main>
  );
}
