#!/bin/bash

# College Portal - Quick Deploy Script
# This script helps you deploy the frontend to Vercel

echo "🚀 College Portal - Vercel Deployment Helper"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the College_Portal root directory"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo ""
echo "1. ✅ Have you pushed your code to GitHub?"
echo "2. ✅ Have you deployed the backend to Railway/Render?"
echo "3. ✅ Do you have your backend URL ready?"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "🔧 Deployment Options:"
echo ""
echo "Option 1: Deploy via Vercel Dashboard (Recommended)"
echo "  - Go to https://vercel.com/new"
echo "  - Import your GitHub repository"
echo "  - Set Root Directory: frontend"
echo "  - Set Build Command: npm run build"
echo "  - Set Output Directory: dist"
echo "  - Add Environment Variable: VITE_API_URL"
echo ""
echo "Option 2: Deploy via Vercel CLI"
echo "  - Install: npm i -g vercel"
echo "  - Run: cd frontend && vercel --prod"
echo ""

read -p "Do you want to install Vercel CLI now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    
    echo ""
    echo "✅ Vercel CLI installed!"
    echo ""
    echo "Next steps:"
    echo "1. cd frontend"
    echo "2. vercel login"
    echo "3. vercel --prod"
    echo "4. Set VITE_API_URL environment variable in Vercel dashboard"
else
    echo ""
    echo "📝 Manual deployment steps:"
    echo "1. Visit https://vercel.com"
    echo "2. Sign in with GitHub"
    echo "3. Import your College_Portal repository"
    echo "4. Configure build settings (see above)"
    echo "5. Add environment variable VITE_API_URL with your backend URL"
    echo "6. Click Deploy!"
fi

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "Need help? Check the deployment logs on Vercel dashboard"
echo "=============================================="
