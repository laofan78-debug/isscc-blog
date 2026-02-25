#!/bin/bash
# 自动发布ISSCC论文解读到博客
# 用法: ./publish.sh "论文标题" "论文内容"

set -e

BLOG_DIR="/root/.openclaw/workspace/isscc-blog"
POSTS_DIR="$BLOG_DIR/content/posts"

# 参数检查
if [ $# -lt 2 ]; then
    echo "用法: $0 \"论文标题\" \"论文内容\""
    exit 1
fi

TITLE="$1"
CONTENT="$2"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')

# 生成frontmatter
FILENAME="$POSTS_DIR/${SLUG:0:50}.md"

cat > "$FILENAME" << EOF
---
title: "$TITLE"
date: "$DATE"
authors: "ISSCC 2026"
excerpt: "${CONTENT:0:200}..."
---

$CONTENT
EOF

echo "✅ 文章已生成: $FILENAME"

# 如果配置了git，自动提交推送
if [ -d "$BLOG_DIR/.git" ]; then
    cd "$BLOG_DIR"
    git add -A
    git commit -m "Add: $TITLE"
    git push origin main
    echo "✅ 已推送到GitHub，Vercel将自动部署"
else
    echo "⚠️ 未配置Git仓库，请手动提交: cd $BLOG_DIR && git init && git add ."
fi