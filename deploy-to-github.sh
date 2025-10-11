#!/bin/bash

echo "☁️ Deploying BAPS Mandir Kiosk to GitHub Pages"
echo "=============================================="
echo ""

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git not found! Please install Git first."
    echo "Download from: https://git-scm.com"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy BAPS Mandir Kiosk to GitHub Pages" || echo "No changes to commit"

# Check if remote exists
if ! git remote get-url origin &> /dev/null; then
    echo ""
    echo "🔗 No GitHub remote found!"
    echo "Please create a GitHub repository and add it as remote:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository (e.g., 'mandir-kiosk')"
    echo "3. Copy the repository URL"
    echo "4. Run: git remote add origin [YOUR_REPO_URL]"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "🌐 Next steps to enable GitHub Pages:"
echo "1. Go to your GitHub repository"
echo "2. Click 'Settings' tab"
echo "3. Scroll down to 'Pages' section"
echo "4. Under 'Source', select 'Deploy from a branch'"
echo "5. Select 'main' branch and '/ (root)' folder"
echo "6. Click 'Save'"
echo ""
echo "🎉 Your website will be available at:"
echo "   https://[YOUR_USERNAME].github.io/[REPO_NAME]"
echo ""
echo "💡 Note: It may take a few minutes for the site to be available."



