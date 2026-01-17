# Railway Deployment Troubleshooting Guide

## Common Railway Errors & Solutions

### Error 1: "Application failed to respond"
**Problem**: Backend not starting or crashing immediately

**Solutions**:
1. **Check Start Command**
   - Railway Settings → Deploy → Start Command
   - Should be: `npm start` or `node server.js`

2. **Verify package.json**
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

3. **Check Logs**
   - Railway Dashboard → Deployments → View Logs
   - Look for error messages

---

### Error 2: "Cannot find module"
**Problem**: Missing dependencies

**Solution**:
```bash
# Make sure all dependencies are in package.json, not devDependencies
# Railway runs npm install --production
```

**Check**: All runtime dependencies should be in `"dependencies"`, not `"devDependencies"`

---

### Error 3: Database Connection Failed
**Problem**: Can't connect to MySQL

**Solutions**:

1. **Add MySQL Plugin**
   - Railway Dashboard → New → Database → Add MySQL
   - Wait for it to provision

2. **Check DATABASE_URL**
   - Railway auto-sets this when you add MySQL
   - Format: `mysql://user:pass@host:port/database`
   - Should appear in Variables tab automatically

3. **Update database config** if using custom connection:
   ```javascript
   // backend/config/database.js should use DATABASE_URL
   const dbUrl = process.env.DATABASE_URL;
   ```

---

### Error 4: "Port already in use"
**Problem**: Wrong port configuration

**Solution**:
Railway automatically sets PORT environment variable. Your code already handles this:
```javascript
const PORT = process.env.PORT || 5000; // ✅ Correct
```

**Don't hardcode**: `app.listen(5000)` ❌

---

### Error 5: Environment Variables Missing
**Problem**: JWT_SECRET, Cloudinary keys not set

**Solution**:
1. Railway Dashboard → Variables tab
2. Add all required variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your_super_secret_jwt_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_secret
   FRONTEND_URL=https://your-app.vercel.app
   ```

3. **Important**: DATABASE_URL is auto-added by Railway MySQL plugin

---

### Error 6: Build Timeout
**Problem**: Installation takes too long

**Solutions**:
1. Check for unnecessary large dependencies
2. Use Railway's faster build regions
3. Try deploying from CLI instead:
   ```bash
   npm i -g @railway/cli
   railway login
   railway up
   ```

---

## Step-by-Step Railway Setup (Fresh Start)

### 1. Create New Project
```
Railway Dashboard → New Project → Deploy from GitHub repo
```

### 2. Configure Service
- **Repository**: Select your College_Portal repo
- **Root Directory**: `backend`
- **Start Command**: Leave blank (uses package.json)

### 3. Add MySQL Database
```
Same project → New → Database → Add MySQL
```
Wait 1-2 minutes for provisioning.

### 4. Set Environment Variables
Go to Variables tab and add:
```
JWT_SECRET=change_this_to_a_random_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

**Note**: DATABASE_URL is automatically added by MySQL plugin

### 5. Deploy
Click "Deploy" or push to GitHub (auto-deploys)

### 6. Get Your URL
- Settings → Domains
- Copy the Railway URL (e.g., `backend-production-xxxx.up.railway.app`)
- Add `https://` prefix when using

---

## Quick Diagnostics

### Check 1: Is the service running?
```
Railway Dashboard → Service → Deployments
Status should be "Active" with green dot
```

### Check 2: View logs
```
Deployments → Latest deployment → View Logs
Look for:
- ✅ "Server running on port..."
- ✅ "Database connected successfully"
- ❌ Any error messages
```

### Check 3: Test health endpoint
```bash
curl https://your-backend.up.railway.app/api/health
# Should return: {"status":"ok","message":"College Portal API is running"}
```

### Check 4: Database tables created?
```
Railway Dashboard → MySQL plugin → Data tab
Should see tables: Users, Resources, Projects, Results, etc.
```

---

## Alternative: Use Render Instead of Railway

If Railway continues to have issues:

### Deploy to Render (Free Tier)
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add PostgreSQL database (free) or external MySQL
6. Set environment variables
7. Deploy

**Note**: Render free tier sleeps after inactivity (cold starts)

---

## Still Having Issues?

### Share These Details:
1. **Error message** from Railway logs
2. **Deployment status** (building, crashed, active?)
3. **Environment variables** set (don't share secrets!)
4. **Database plugin** added? (yes/no)

### Common Issue Checklist:
- [ ] MySQL database added to Railway project
- [ ] All environment variables set (JWT_SECRET, Cloudinary, etc.)
- [ ] Start command is `npm start` or `node server.js`
- [ ] package.json has correct dependencies
- [ ] No hardcoded PORT in code
- [ ] FRONTEND_URL will be updated after Vercel deploy

---

## Quick Fix Script

Try this if deployment keeps failing:

```bash
# In your backend directory
cd /home/abhay/Documents/College_Portal/backend

# Verify package.json has start script
cat package.json | grep "start"

# Test locally first
npm install
npm start

# If it works locally, Railway should work too
```

---

**Most Common Issue**: Missing DATABASE_URL
- **Fix**: Make sure you clicked "New → Database → Add MySQL" in Railway
- Railway will automatically inject DATABASE_URL into your service
