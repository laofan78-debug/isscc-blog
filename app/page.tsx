import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">论文解读列表</h2>
        <p className="text-gray-600">
          每天更新ISSCC 2026中与AI相关的论文深度解读
        </p>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-gray-500 text-center py-12">
            暂无论文解读，请稍候...
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow p-6">
              <Link href={`/posts/${post.slug}`} className="block hover:opacity-80">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {post.date} · {post.authors}
                </p>
                <p className="text-gray-700 line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  )
}