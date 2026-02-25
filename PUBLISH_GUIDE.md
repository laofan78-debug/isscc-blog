# ISSCC博客自动发布工具

## 使用方法

### 1. 初始化Git仓库并推送到GitHub

```bash
cd /root/.openclaw/workspace/isscc-blog
git init
git add .
git commit -m "Initial commit"

# 在GitHub创建仓库后，添加远程地址
git remote add origin https://github.com/YOUR_USERNAME/isscc-blog.git
git push -u origin main
```

### 2. 部署到Vercel

1. 访问 https://vercel.com/new
2. 导入GitHub仓库
3. 保持默认设置，点击Deploy
4. 记录项目信息用于自动部署

### 3. 配置GitHub Secrets（用于自动部署）

在GitHub仓库 → Settings → Secrets and variables → Actions 中添加：

- `VERCEL_TOKEN`: Vercel个人token（从 https://vercel.com/account/tokens 获取）
- `VERCEL_ORG_ID`: Vercel组织ID
- `VERCEL_PROJECT_ID`: Vercel项目ID

获取方式：
```bash
npm i -g vercel
vercel login
vercel link
# 查看 .vercel/project.json
```

### 4. 自动发布文章

#### 方式一：使用脚本
```bash
./publish.sh "论文标题" "论文内容"
```

#### 方式二：使用feishu_doc工具
直接创建markdown文件到 content/posts/ 目录

#### 方式三：定时任务自动发布
修改ISSCC解读任务，在生成内容后自动调用发布

## 文件结构

```
isscc-blog/
├── app/                    # Next.js应用
├── content/posts/          # 文章目录
├── lib/posts.ts           # 文章处理逻辑
├── .github/workflows/     # GitHub Actions
├── publish.sh             # 发布脚本
└── README.md
```

## 本地预览

```bash
cd /root/.openclaw/workspace/isscc-blog
npm install
npm run dev
# 访问 http://localhost:3000
```
