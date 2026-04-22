# Fix MongoDB Connection on Vercel

## The Problem
Your frontend is deployed on Vercel and trying to call the backend API, but the backend can't connect to MongoDB because environment variables aren't set.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Your Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Find your project "vipin-gupta-dash"
3. Click to open the project

### Step 2: Navigate to Environment Variables
1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)

### Step 3: Add MongoDB Variables
Add these exact variables:

| Variable Name | Value |
|---|---|
| `MONGODB_URI` | `mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0` |
| `MONGODB_DB_NAME` | `trolley` |
| `NODE_ENV` | `production` |

**Important**: Click the dropdown next to each variable and select **"Production"** (or "All Environments")

### Step 4: Redeploy
1. Go back to **Deployments** tab
2. Find your latest deployment
3. Click the three dots menu
4. Click **"Redeploy"**
5. Wait for deployment to complete (2-3 minutes)

### Step 5: Verify
1. Open your Vercel project URL
2. Check the browser console for errors
3. Try to load Dashboard - it should now work

## If Still Getting 500 Errors

Check these things:

### Is MongoDB Atlas IP Whitelist Correct?
1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Click your Cluster: "Cluster0"
3. Go to **Network Access**
4. Make sure **0.0.0.0/0** is whitelisted OR your Vercel IP is added

### Check Vercel Logs
1. In Vercel Dashboard, go to **Deployments**
2. Click your latest deployment
3. Go to **Functions** → **api** folder
4. Look for any error messages

### Restart the Backend
If your backend is hosted separately (not on Vercel), make sure it's still running:

**On your local machine:**
```bash
npm run server
```

**Or on Railway/Heroku:**
- Verify the service is running
- Check the logs for MongoDB connection errors

## Common Issues

### Issue: Still getting "MONGODB_URI not configured"
- **Solution**: Make sure you selected "Production" environment when adding variables
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 5 minutes for Vercel to rebuild

### Issue: Connection refused to MongoDB
- **Solution**: Add your IP to MongoDB Atlas Network Access
- Go to MongoDB Atlas → Network Access → Add IP Address
- Select "Allow Access from Anywhere" for development

### Issue: 500 errors but can't see why
- **Solution**: Check Vercel function logs
- In Vercel Dashboard → Deployments → Your deployment → Functions
- Look at the logs for the specific API route failing

## Alternative: Full Backend Deployment

If you want the entire system on Vercel without needing a separate backend:

You can use Vercel's Serverless Functions to handle all API routes instead of `server.js`

Need help setting this up?
