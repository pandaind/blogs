#!/bin/bash

echo "Building Hugo site for production..."

# Clean previous build
rm -rf public/

# Build with minification and production environment
HUGO_ENV=production hugo --minify

echo "Production build completed!"
echo "Files are minified and ready for deployment in the 'public/' directory."
