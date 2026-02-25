import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  authors: string
  institution?: string
  excerpt: string
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        authors: data.authors || '',
        institution: data.institution || '',
        excerpt: data.excerpt || content.slice(0, 200) + '...',
        content: '',
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content)
  
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    authors: data.authors || '',
    institution: data.institution || '',
    excerpt: data.excerpt || content.slice(0, 200) + '...',
    content: contentHtml,
  }
}