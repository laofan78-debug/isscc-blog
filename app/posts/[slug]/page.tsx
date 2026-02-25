import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="bg-white rounded-lg shadow p-8">
      <header className="mb-8 pb-6 border-b">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 text-sm space-y-1">
          <p><span className="font-medium">日期：</span>{post.date}</p>
          <p><span className="font-medium">作者：</span>{post.authors}</p>
          {post.institution && (
            <p><span className="font-medium">机构：</span>{post.institution}</p>
          )}
        </div>
      </header>

      <div 
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}