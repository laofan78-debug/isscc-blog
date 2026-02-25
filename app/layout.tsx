import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISSCC 2026 AI论文解读',
  description: 'ISSCC 2026会议AI相关论文深度解读',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold">ISSCC 2026 AI论文解读</h1>
            <p className="text-gray-600 mt-1">IEEE International Solid-State Circuits Conference</p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-white border-t mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            © 2026 ISSCC AI Paper Reviews
          </div>
        </footer>
      </body>
    </html>
  )
}