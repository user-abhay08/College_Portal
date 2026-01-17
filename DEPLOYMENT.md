# Deployment Guide - College Portal

## Quick Deploy to Vercel (Frontend Only)

### Prerequisites
1. GitHub account
2. Vercel account (free)
3. Backend deployed separately (Railway/Render)

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   cd /home/abhay/Documents/College_Portal
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add Environment Variable:
     - **Name**: `VITE_API_URL`
     - **Value**: Your backend URL (e.g., `https://college-portal-backend.railway.app`)
   - Click "Deploy"

3. **Get Your URL**
   - Your app will be live at `https://your-app.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy Frontend**
   ```bash
   cd /home/abhay/Documents/College_Portal/frontend
   vercel --prod
   ```

4. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_URL production
   # Enter your backend URL when prompted
   ```

## Deploy Backend (Required)

### Option 1: Railway (Easiest)

1. **Sign up**: [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. **Select repository** and set root to `backend`
4. **Add MySQL Database**: New → Database → MySQL
5. **Set Environment Variables**:
   ```
   DATABASE_URL (auto-filled from MySQL)
   JWT_SECRET=your-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. **Deploy** - Railway will auto-deploy
7. **Copy** your backend URL

### Option 2: Render

1. **Sign up**: [render.com](https://render.com)
2. **New Web Service** → Connect GitHub
3. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add PostgreSQL** (or use external MySQL)
5. **Set Environment Variables** (same as above)
6. **Create Web Service**

## After Deployment

### Update CORS
Your backend needs to allow your Vercel domain. Update `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',
    'https://*.vercel.app' // Allow preview deployments
  ],
  credentials: true
}));
```

### Update Frontend API URL
In Vercel dashboard:
1. Go to Project Settings
2. Environment Variables
3. Update `VITE_API_URL` with your Railway/Render backend URL
4. Redeploy

### Test Your Deployment
1. Visit your Vercel URL
2. Register a new account
3. Try uploading a resource
4. Check if results page loads
5. Test project creation

## Troubleshooting

**Frontend not loading?**
- Check Vercel build logs
- Verify build command is `npm run build`
- Ensure `dist` is the output directory

**API calls failing?**
- Check `VITE_API_URL` environment variable
- Verify backend is running on Railway/Render
- Check CORS configuration
- Look at browser console for errors

**Database connection error?**
- Verify `DATABASE_URL` in Railway
- Check MySQL service is running
- Test connection from Railway logs

**File uploads not working?**
- Verify Cloudinary credentials
- Check API key permissions
- Look at backend logs

## Monitoring

- **Vercel**: Check Analytics dashboard
- **Railway**: View logs and metrics
- **Cloudinary**: Monitor usage in dashboard

## Free Tier Limits

- **Vercel**: 100GB bandwidth/month
- **Railway**: $5 credit (~500 hours)
- **Cloudinary**: 25GB storage, 25k transformations

## Need Help?

Check deployment logs:
- Vercel: Project → Deployments → View logs
- Railway: Service → Deployments → Logs
