# Vercel Deployment Fix Guide

## The Problem
When deploying to Vercel, you were getting **404 NOT_FOUND** errors when trying to access any page or API endpoint. The API calls to `/api/categories`, `/api/products`, etc., were failing.

## Why It Was Happening
1. **Missing `vercel.json` configuration** - Vercel didn't know how to:
   - Build the Vite frontend
   - Serve the `/api` serverless functions
   - Route requests between frontend and API

2. **Incorrect request routing** - Frontend requests to `/api/*` weren't being directed to the serverless functions

## The Solution

### 1. Created Proper `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```

**What this does:**
- `buildCommand`: Tells Vercel to run `npm run build` (Vite build)
- `outputDirectory`: Points to the built frontend output folder
- `framework`: Specifies this is a Vite project
- `rewrites`: Routes API requests to serverless functions, and frontend routes to index.html

### 2. Updated All API Routes
- Each `/api/*.ts` file now:
  - Properly checks for `MONGODB_URI` environment variable
  - Creates a fresh MongoDB connection
  - Closes connections in a `finally` block
  - Returns proper JSON with Content-Type headers
  - Includes CORS headers for cross-origin requests

### 3. Updated MongoDB Service
- Changed API base URL to use `/api` in production instead of `localhost:3001`
- Dynamic URL selection based on environment (localhost for dev, `/api` for production)

## Environment Variables Required
Add these to your Vercel project settings (Settings → Environment Variables):

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0` |
| `MONGODB_DB_NAME` | `trolley` |

## What to Do Now

1. **Redeploy** your project on Vercel
2. **Verify** environment variables are set in Vercel dashboard
3. **Test** by visiting any page (e.g., `/products`, `/customers`)
4. **Check browser Network tab** if issues persist - you should see:
   - `GET /api/products 200` ✓
   - `GET /api/customers 200` ✓
   - etc.

## How It Works Now

```
Browser Request
    ↓
Vercel Edge Network
    ↓
Routes /api/* → Serverless Functions
Routes /* → Frontend (dist/index.html)
    ↓
API Functions connect to MongoDB
    ↓
Return JSON response
```

## If Issues Persist

1. Check Vercel Logs: Go to your project → Deployments → Logs
2. Check Browser Console: Look for actual error responses from `/api/*` endpoints
3. Verify MongoDB Connection: Test your MONGODB_URI directly
4. Check CORS: Your API endpoints have CORS headers enabled

---

**Status**: Ready to deploy! All components are now properly configured.
