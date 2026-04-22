# Vercel Environment Variables Setup Checklist

## ✅ Step-by-Step Setup

### 1. Open Vercel Dashboard
- Go to https://vercel.com/dashboard
- Click on your project: `vipin-gupta-dashboard1`

### 2. Go to Settings → Environment Variables
- Click the **Settings** tab at the top
- Click **Environment Variables** in the left sidebar

### 3. Add Required Variables

Copy and paste these variables one by one:

#### Variable 1: MONGODB_URI
- **Key**: `MONGODB_URI`
- **Value**: `mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0`
- **Environments**: Select all (Production, Preview, Development)
- Click **Save**

#### Variable 2: MONGODB_DB_NAME
- **Key**: `MONGODB_DB_NAME`
- **Value**: `trolley`
- **Environments**: Select all (Production, Preview, Development)
- Click **Save**

#### Variable 3: NODE_ENV (Optional but recommended)
- **Key**: `NODE_ENV`
- **Value**: `production`
- **Environments**: Select all
- Click **Save**

### 4. Redeploy Your Project

After adding variables, you MUST redeploy:
- Go to **Deployments** tab
- Click the three dots (•••) on your latest deployment
- Click **Redeploy**

OR push new code:
```bash
git add .
git commit -m "Update Vercel deployment"
git push origin main
```

## ✅ Variables You DON'T Need in Vercel

❌ **Remove or Ignore These:**
- `VITE_MONGODB_URI` - Never expose in browser (security risk!)
- `VITE_API_URL` - Frontend already uses `/api` automatically
- `PORT` - Vercel assigns ports automatically
- `API_HOST` - Not needed in production
- `NODE_ENV=development` - Use `production` instead

## ✅ Verification

After redeployment, test these URLs:

1. **Health Check**: https://vipin-gupta-dashboard1.vercel.app/api/health
   - Should return: `{"status":"ok"}`

2. **Products Endpoint**: https://vipin-gupta-dashboard1.vercel.app/api/products
   - Should return: JSON array of products (or empty array)

3. **Dashboard**: https://vipin-gupta-dashboard1.vercel.app
   - All pages should load without `ERR_CONNECTION_REFUSED`

## ✅ If Still Getting Errors

### Error: "Environment Variable 'MONGODB_URI' references Secret 'mongodb_uri'"
- This means the variable hasn't been saved yet
- Click **Save** after entering the value
- Redeploy the project

### Error: "ERR_CONNECTION_REFUSED" on dashboard
1. Check MongoDB Atlas Network Access:
   - Go to mongodb.com → Atlas
   - Go to Network Access
   - Add `0.0.0.0/0` to allow Vercel connections

2. Check Vercel Function Logs:
   - Deployments → Latest → Function Logs
   - Look for MongoDB connection errors

3. Verify credentials:
   - Double-check username and password in `MONGODB_URI`
   - Test connection locally first

### Error: "Connection Timeout"
- MongoDB might be blocking Vercel IPs
- Add `0.0.0.0/0` to MongoDB Atlas Network Access
- Wait 5-10 minutes for changes to apply

## ✅ Security Best Practices

⚠️ **IMPORTANT:**
- Never commit `.env` file with real credentials to GitHub
- The `.env.example` file shows what variables are needed (without values)
- Only add real credentials in Vercel dashboard
- Consider rotating your MongoDB password after testing

## Need Help?

- Check Vercel Docs: https://vercel.com/docs/concepts/projects/environment-variables
- Check MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- View function logs in Vercel dashboard for detailed error messages
