#!/bin/bash
# Clone blog content from the blogs repo before building
# This runs during Netlify build so blog posts are available at build time

if [ -d "content" ] && [ -d "content/.git" ]; then
  echo "Content repo already exists, pulling latest..."
  cd content && git pull origin main && cd ..
else
  echo "Cloning blog content..."
  rm -rf content
  git clone https://github.com/deepaakk04/blogs.git content
fi

echo "Blog content ready!"
