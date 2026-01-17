# Quick Start - Deploy to Vercel

## Fastest Way to Deploy (5 minutes)

### Step 1: Push to GitHub
```bash
cd /home/abhay/Documents/College_Portal
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy Frontend on Vercel

**Go to**: [vercel.com/new](https://vercel.com/new)

1. Click "Import Project"
2. Select your GitHub repository
3. **Configure Settings**:
   - Framework: **Vite**
   - Root Directory: **`frontend`**
   - Build Command: **`npm run build`**
   - Output Directory: **`dist`**

4. **Add Environment Variable**:
   - Name: **`VITE_API_URL`**
   - Value: **Your backend URL** (see Step 3)

5. Click **"Deploy"** 🚀

### Step 3: Deploy Backend on Railway

**Go to**: [railway.app](https://railway.app)

1. Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. **Configure**:
   - Root Directory: **`backend`**
   - Start Command: **`npm start`**

5. **Add MySQL Database**:
   - Click "New" → "Database" → "MySQL"
   - Copy the connection URL

6. **Set Environment Variables**:
   ```
   DATABASE_URL=<auto-filled-from-mysql>
   JWT_SECRET=your_super_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   FRONTEND_URL=https://your-app.vercel.app
   ```

7. **Copy your Railway URL** (e.g., `https://college-portal-backend.up.railway.app`)

### Step 4: Update Vercel

Go back to Vercel:
1. Project Settings → Environment Variables
2. Update **`VITE_API_URL`** with your Railway URL
3. Redeploy (Deployments → Redeploy)

### Step 5: Test Your App! 🎉

Visit your Vercel URL and test:
- ✅ Sign up
- ✅ Login
- ✅ Upload a resource
- ✅ Browse resources
- ✅ Create a project

---

## Alternative: Deploy via CLI

### Vercel CLI
```bash
npm i -g vercel
cd frontend
vercel login
vercel --prod
```

### Railway CLI
```bash
npm i -g railway
cd backend
railway login
railway up
```

---

## Troubleshooting

**API calls failing?**
- Check VITE_API_URL is set correctly in Vercel
- Verify backend is running on Railway
- Check CORS settings in backend

**Database error?**
- Verify DATABASE_URL in Railway
- Check MySQL service is running

**Build failing?**
- Check build logs in Vercel
- Ensure all dependencies are in package.json
- Try building locally: `npm run build`

---

**Need detailed instructions?** See [DEPLOYMENT.md](./DEPLOYMENT.md)
