# ISSCC 2026 AI论文解读博客

基于 Next.js + Markdown 的静态博客，自动发布ISSCC 2026 AI相关论文解读。

## 项目结构

```
isscc-blog/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── posts/[slug]/      # 文章详情页
├── content/posts/         # Markdown文章目录
├── lib/                   # 工具函数
├── public/               # 静态资源
└── next.config.js        # Next.js配置
```

## 自动发布流程

1. ISSCC解读任务生成内容
2. 保存为Markdown到 `content/posts/`
3. 推送至GitHub
4. Vercel自动构建部署

## 本地开发

```bash
npm install
npm run dev
```

## 部署

连接GitHub仓库到Vercel，自动部署。
