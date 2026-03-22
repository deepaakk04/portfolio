#!/bin/bash
# Clone blog content from the blogs repo before building
# This runs during Netlify build so blog posts are available at build time

REPO_URL="https://github.com/deepaakk04/blogs.git"
if [ -n "$GITHUB_TOKEN" ]; then
  REPO_URL="https://${GITHUB_TOKEN}@github.com/deepaakk04/blogs.git"
fi

if [ -d "content" ] && [ -d "content/.git" ]; then
  echo "Content repo already exists, pulling latest..."
  cd content
  git remote set-url origin $REPO_URL
  git pull origin main
  cd ..
else
  echo "Cloning blog content..."
  rm -rf content
  git clone $REPO_URL content
fi

echo "Blog content ready!"

if [ -d "content/images" ]; then
  echo "Copying blog images to public directory..."
  mkdir -p public/blog/images
  cp -r content/images/* public/blog/images/
fi

if [ "$NETLIFY" = "true" ] || [ "$CI" = "true" ]; then
  echo "Stripping .git folder for CI build to avoid secret exposure..."
  rm -rf content/.git
fi
