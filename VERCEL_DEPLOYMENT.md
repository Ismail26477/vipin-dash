# Vercel Deployment Guide - Viptin Gupta Dashboard

This guide will help you deploy your dashboard application to Vercel.

## Overview

Your application has:
- **Frontend**: Vite + React (builds to `/dist`)
- **Backend**: Node.js/Express API server (for MongoDB operations)

### Deployment Architecture

**Option 1: Frontend Only (Recommended - Free Tier)**
- Deploy just the React frontend to Vercel
- Keep backend running separately (Railway, Render, Heroku)
- Simple setup, scalable

**Option 2: Full Stack on Vercel**
- Convert backend to Vercel Functions
- More complex but everything in one place

## Step 1: Prepare Your Repository (GitHub)

### 1a. Create a GitHub Repository
```bash
# Initialize git (if not done)
git init

# Add your MongoDB credentials to .env (local only)
echo ".env.local" >> .gitignore

# Add all files
git add .

# Commit
git commit -m "Initial commit: Viptin Gupta Dashboard"

# Create a repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/viptin-dashboard.git
git branch -M main
git push -u origin main
```

### 1b. Important: Add `.env.local` to `.gitignore`
```
.env.local
.env
.env.*.local
node_modules/
dist/
```

---

## Step 2: Deploy Frontend to Vercel (Easy)

### 2a. Connect to Vercel
1. Go to **https://vercel.com**
2. Sign up or log in with GitHub
3. Click **"New Project"**
4. Select your GitHub repository
5. Vercel will auto-detect it's a Vite project

### 2b. Configure Environment Variables
In Vercel dashboard:
1. Go to **Settings → Environment Variables**
2. Add these variables:

```
VITE_MONGODB_URI=mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0
VITE_MONGODB_DB_NAME=trolley
VITE_API_URL=https://your-backend-url.com  (backend URL - set this after deploying backend)
```

### 2c. Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. Your frontend will be live at `https://your-project.vercel.app`

---

## Step 3: Deploy Backend (Choose One Option)

### **Option A: Railway.app (Recommended - Easy & Free)**

#### A1. Create Railway Account
1. Go to **https://railway.app**
2. Sign up with GitHub

#### A2. Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select your repository

#### A3. Add Environment Variables
1. In Railway dashboard, go to **Variables**
2. Add:
```
MONGODB_URI=mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=trolley
NODE_ENV=production
PORT=3000
```

#### A4. Configure Build & Start
1. Go to **Settings → Build Command**: 
```
npm install
```

2. Go to **Settings → Start Command**:
```
node server.js
```

3. Deploy will start automatically
4. Get your backend URL from Railway dashboard

#### A5. Update Frontend API URL
1. Go back to Vercel dashboard
2. Update environment variable:
```
VITE_API_URL=https://your-railway-url.railway.app
```
3. Redeploy frontend

---

### **Option B: Render.com (Also Free)**

#### B1. Create Render Account
1. Go to **https://render.com**
2. Sign up with GitHub

#### B2. Create New Web Service
1. Click **"New +" → "Web Service"**
2. Select your repository
3. Configure:
   - **Name**: viptin-dashboard-api
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

#### B3. Add Environment Variables
```
MONGODB_URI=mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=trolley
NODE_ENV=production
```

#### B4. Deploy & Get URL
1. Deploy starts automatically
2. Copy your service URL from Render dashboard

#### B5. Update Frontend
1. Update Vercel environment variable:
```
VITE_API_URL=https://your-render-url.onrender.com
```

---

## Step 4: Update Frontend API Calls

Your frontend needs to use the correct backend URL. Update in your components:

### Before (Local Development)
```javascript
const response = await fetch('/api/products');
```

### After (Production)
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await fetch(`${API_URL}/api/products`);
```

Or create an API utility file:
```javascript
// src/lib/api.ts
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
```

---

## Step 5: Important Security Notes

⚠️ **NEVER commit `.env.local` to GitHub!**

Your credentials should only be in:
- Local `.env.local` (for development)
- Vercel/Railway/Render environment variables (for production)

### Update MongoDB Network Access
Your MongoDB must allow connections from:
1. Your computer (for development): Add your IP
2. Production servers: Add 0.0.0.0/0 (allow all) or specific IPs

To update in MongoDB Atlas:
1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Add `0.0.0.0/0` for production (or specific IPs)

---

## Step 6: Test Your Deployment

### Frontend is Live
```
https://your-project.vercel.app
```

### Backend is Live
```
Test: https://your-backend-url/api/health
```

### Full Test
1. Visit your frontend URL
2. Try to add a product
3. Should see data from MongoDB
4. Try to delete (test from earlier fix)

---

## Troubleshooting

### "Connection Refused" Error
- Backend is not running or not deployed yet
- Check if Railway/Render deployment is active
- Check environment variables are correct

### MongoDB Connection Error
- Credentials are wrong
- MongoDB IP whitelist doesn't include the server
- Database name is wrong (should be "trolley")

### CORS Errors
- Backend CORS is not configured properly
- Make sure `cors()` is enabled in server.js

### Frontend Shows "No categories"
- Backend API URL not set correctly
- Check Vercel environment variables
- Test API endpoint directly in browser

---

## Useful Commands

### Deploy Frontend Changes
```bash
git push origin main
# Vercel auto-deploys on push
```

### Deploy Backend Changes
```bash
git push origin main
# Railway/Render auto-deploys on push (if configured)
```

### View Logs
- **Vercel**: Dashboard → Deployments → View logs
- **Railway**: Dashboard → Deployments → Logs
- **Render**: Dashboard → Logs

### Test Backend Locally
```bash
npm run server
# Server runs on http://localhost:5000
```

### Test Full App Locally
```bash
npm run dev:all
# Frontend: http://localhost:8080
# Backend: http://localhost:5000
```

---

## Final Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] GitHub repository is created and pushed
- [ ] Vercel frontend is deployed
- [ ] Railway/Render backend is deployed
- [ ] Environment variables set in Vercel (VITE_API_URL)
- [ ] Environment variables set in Railway/Render (MONGODB_URI)
- [ ] MongoDB IP whitelist includes server IPs
- [ ] Frontend tests load data from backend
- [ ] Delete product/category works

---

## Getting Help

- **Vercel Issues**: https://vercel.com/help
- **Railway Issues**: https://railway.app/docs
- **Render Issues**: https://render.com/docs
- **MongoDB Issues**: https://docs.mongodb.com

---

**You're all set!** Your dashboard is now live on the internet. 🚀
