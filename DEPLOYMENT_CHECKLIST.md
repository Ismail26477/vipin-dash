# Deployment Checklist - Viptin Gupta Dashboard

## Pre-Deployment

### Local Testing
- [ ] Run `npm run dev:all` and verify dashboard works
- [ ] Test adding a product
- [ ] Test deleting a product
- [ ] Test adding a category
- [ ] Test deleting a category
- [ ] Check browser console for errors

### Git & GitHub
- [ ] Create GitHub account if you don't have one
- [ ] Create new repository on GitHub
- [ ] Add `.env.local` to `.gitignore`
- [ ] Commit all files: `git add . && git commit -m "Ready for deployment"`
- [ ] Push to GitHub: `git push origin main`

### MongoDB Atlas
- [ ] Your MongoDB cluster is running
- [ ] Database name is `trolley`
- [ ] Connection string is: `mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0`
- [ ] Go to Network Access and check IP whitelist (will update for production servers)

---

## Frontend Deployment (Vercel)

### Create Vercel Account
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub (or email)
- [ ] Authorize Vercel to access your GitHub account

### Import Project
- [ ] Click "New Project"
- [ ] Select your repository
- [ ] Click "Import"
- [ ] Vercel detects Vite automatically

### Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
- [ ] Add `VITE_API_URL` (leave blank for now, update after backend deployment)
- [ ] Production environment

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Copy your frontend URL: `https://your-project.vercel.app`
- [ ] Test the site loads (might show "Connection refused" - that's OK, backend not live yet)

---

## Backend Deployment (Railway.app)

### Create Railway Account
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Authorize Railway

### Create New Project
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Find and select your repository
- [ ] Authorize Railway to access your repository

### Add Environment Variables
In Railway Dashboard → Variables:
- [ ] `MONGODB_URI=mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0`
- [ ] `MONGODB_DB_NAME=trolley`
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`

### Deploy
- [ ] Railway auto-detects Node.js project
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Click "Deploy"
- [ ] Wait for deployment complete
- [ ] Copy your backend URL from Railway (format: `https://your-service.railway.app`)

### Update MongoDB IP Whitelist
- [ ] Go to MongoDB Atlas → Network Access
- [ ] Add Railway's IP (or use `0.0.0.0/0` for all)
- [ ] If you don't know Railway's IP, allow `0.0.0.0/0` for now

---

## Connect Frontend to Backend

### Update Vercel Environment Variable
- [ ] Go back to Vercel Dashboard
- [ ] Go to Settings → Environment Variables
- [ ] Update `VITE_API_URL` with your Railway URL (e.g., `https://your-service.railway.app`)
- [ ] Save and redeploy

### Verify Connection
- [ ] Go to your Vercel frontend URL
- [ ] Open browser console (F12)
- [ ] Should NOT see "Connection refused" errors
- [ ] Should see categories and products from MongoDB
- [ ] Try adding/deleting a product

---

## Testing Production

### Frontend
- [ ] Open https://your-project.vercel.app
- [ ] Check dashboard loads without errors
- [ ] Check sidebar navigation works
- [ ] Check Products page loads data

### Backend
- [ ] Test API: https://your-railway-url.railway.app/api/health
- [ ] Should return `{"status":"ok"}`

### Database
- [ ] Try adding a product in the dashboard
- [ ] Check MongoDB Atlas → Collections to see new product
- [ ] Try deleting a product
- [ ] Product should disappear from MongoDB

### Full Integration
- [ ] Add a new product → Should appear in MongoDB
- [ ] Delete that product → Should disappear from MongoDB
- [ ] Add a category → Should appear in MongoDB
- [ ] Delete that category → Should disappear from MongoDB

---

## Troubleshooting

### Dashboard shows "Connection refused"
**Problem**: Frontend can't reach backend
**Solution**: 
- Check Railway backend is deployed and running
- Check VITE_API_URL is set correctly in Vercel
- No trailing slash in VITE_API_URL
- Run Vercel redeploy after updating env var

### "No categories" or data not showing
**Problem**: Backend is running but returning no data
**Solution**:
- Check MongoDB connection string is correct
- Check MongoDB database name is "trolley"
- Check MongoDB IP whitelist includes Railway IP
- Check Railway logs for errors

### Can't delete products/categories
**Problem**: Delete requests failing
**Solution**:
- Check backend logs in Railway
- Make sure `_id` field is being sent (not `id`)
- Test with: `curl https://your-railway-url.railway.app/api/health`

### Build fails on Vercel
**Problem**: Vite build failing
**Solution**:
- Check build logs in Vercel
- Make sure `.env.local` is NOT in git
- Make sure all imports are correct
- Try: `npm run build` locally to test

---

## After Deployment

### Monitor Performance
- [ ] Set up Vercel Analytics (free tier)
- [ ] Set up Railway error alerts
- [ ] Monitor MongoDB usage in Atlas

### Security
- [ ] Secure your MongoDB credentials (already in env vars)
- [ ] Use strong admin password for MongoDB
- [ ] Enable MongoDB access control
- [ ] Review Railway security settings

### Maintenance
- [ ] Set up GitHub Actions for auto-deploy (optional)
- [ ] Keep MongoDB backups (Atlas handles this)
- [ ] Monitor error logs regularly

---

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- Your Frontend: https://your-project.vercel.app
- Your Backend: https://your-service.railway.app/api/health

---

## Need Help?

1. Read VERCEL_DEPLOYMENT.md for detailed instructions
2. Check Vercel logs: Dashboard → Deployments → Logs
3. Check Railway logs: Dashboard → Logs
4. Check MongoDB Atlas: Network Access, Databases, Logs

---

**Status**: Ready to deploy! ✨
