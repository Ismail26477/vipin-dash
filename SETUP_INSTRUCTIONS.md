# MongoDB Dashboard - Setup Instructions

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account with cluster created
- npm or yarn package manager

## Environment Configuration

Your `.env.local` file has been created with the following:
```
VITE_MONGODB_URI=mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0
VITE_MONGODB_DB_NAME=trolley
PORT=5000
NODE_ENV=development
```

## Important: IP Whitelist in MongoDB Atlas

Before running the application, you **MUST** whitelist your IP address in MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Select your "Cluster0" project
3. Click on "Network Access" (left sidebar)
4. Click "Add IP Address"
5. Add your current IP address or allow access from anywhere (0.0.0.0/0 - only for development)
6. Click "Confirm"

## Running the Application

### Step 1: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 2: Start the Backend Server (Port 5000)
Open a **new terminal** and run:
```bash
npm run server
# or
node server.js
```

You should see:
```
[v0] Attempting to connect to MongoDB...
[v0] Successfully connected to MongoDB database: trolley
[v0] Server running on http://localhost:5000
```

### Step 3: Start the Frontend Development Server (Port 8080)
In your **original terminal**, run:
```bash
npm run dev
```

You should see:
```
➜  Local:   http://localhost:8080/
```

### Step 4: Access the Application
Open your browser and go to:
```
http://localhost:8080
```

## Troubleshooting

### "ERR_CONNECTION_REFUSED" - Backend not running
- Make sure you ran `npm run server` in a separate terminal
- Verify the backend is running on port 5000
- Check that no firewall is blocking localhost:5000

### "ERR_MONGODB connection refused" - MongoDB connection issue
1. Check your MongoDB URI is correct
2. Verify your IP address is whitelisted in MongoDB Atlas Network Access
3. Ensure your credentials (ismail/ismail123) are correct
4. Try connecting directly from MongoDB Compass with your URI

### "No categories found" - Empty database
This is normal on first run. Use the "Add Category" button to create initial data.

### Duplicate @types/node warning
This is safe to ignore. Run to clean up if needed:
```bash
npm dedupe
```

## Database Collections

The application uses these MongoDB collections in the "trolley" database:
- `products` - Product catalog
- `categories` - Product categories
- `subcategories` - Subcategories within categories
- `orders` - Customer orders
- `customers` - Customer information
- `reviews` - Product reviews

## Development Notes

- Frontend runs on `http://localhost:8080` (Vite)
- Backend API runs on `http://localhost:5000` (Express)
- Frontend automatically proxies `/api/*` requests to the backend
- All API responses use MongoDB's `_id` field (not `id`)

## Default Admin Login
- Email: `admin@lugadmin.com`
- Password: `admin123`

---
Need help? Check the console errors carefully - they usually indicate the exact problem!
