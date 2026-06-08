# MongoDB Atlas Setup Guide

## Step-by-Step Instructions

### Step 1: Create a Free MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Sign Up"** or **"Try Free"**
3. Create an account using:
   - Email address
   - Password
   - Agree to terms
4. Click **"Create your Atlas Account"**

### Step 2: Create a New Project
1. After signing up, you'll see the dashboard
2. Click **"+ New Project"** button
3. Enter a project name (e.g., "Nextgen")
4. Click **"Next"**
5. Leave default settings and click **"Create Project"**

### Step 3: Create a Cluster
1. You'll be prompted to **"Create a Deployment"**
2. Select **"M0 Free"** (completely free tier) ✓
3. Choose your cloud provider:
   - AWS, Google Cloud, or Azure (all free tier available)
   - Select a region closest to you
4. Click **"Create Deployment"**
5. Wait 2-3 minutes for the cluster to be created

### Step 4: Create a Database User
1. In the left sidebar, click **"Database Access"**
2. Click **"+ ADD NEW DATABASE USER"**
3. Fill in:
   - **Username**: `nextgen_user` (or your choice)
   - **Password**: Create a strong password (save this!)
4. Click **"ADD USER"**

### Step 5: Set Up Network Access
1. In the left sidebar, click **"Network Access"**
2. Click **"+ ADD IP ADDRESS"**
3. Select **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0` (allows all IPs)
   - ⚠️ For production, use your specific IP
4. Click **"Confirm"**

### Step 6: Get Your Connection String
1. Go back to **"Database"** in the left sidebar
2. Click the **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Choose **"Node.js"** and version **"4.x or later"**
5. Copy the connection string
   - It will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname`

### Step 7: Update Your Backend `.env` File

Replace the `MONGODB_URI` in `/Users/mahesharunaladi/Nextgen/Nextgen/backend/.env`:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://nextgen_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nextgen?retryWrites=true&w=majority
MONGODB_URI_PROD=mongodb+srv://nextgen_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nextgen?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

**Replace:**
- `nextgen_user` → Your database username
- `YOUR_PASSWORD` → Your database password (URL-encoded if it contains special characters)
- `cluster0.xxxxx` → Your cluster URL

### Step 8: Start Your Backend Server

```bash
cd /Users/mahesharunaladi/Nextgen/Nextgen/backend
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
```

---

## Important Notes

⚠️ **Security Tips:**
- Never commit the `.env` file to git (already in `.gitignore`)
- Don't share your connection string publicly
- For production, use environment variables from your hosting platform
- Create separate database users for development and production
- Enable IP whitelist restrictions for production

### Testing Connection

Once running, test the API:

```bash
# Health check
curl http://localhost:5000/api/health

# Create an example
curl -X POST http://localhost:5000/api/examples \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"My first example"}'

# Get all examples
curl http://localhost:5000/api/examples
```

### MongoDB Atlas Dashboard

Once connected, you can:
- View your data in **"Collections"** tab
- Monitor performance in **"Monitoring"** tab
- View logs in **"Logs"** tab
- Manage backups in **"Backup"** tab

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check IP whitelist in "Network Access" |
| Authentication failed | Verify username and password in connection string |
| Database not found | Connection string will auto-create the database |
| Special characters in password | URL-encode them (e.g., `@` → `%40`, `:` → `%3A`) |

---

## Next Steps

1. ✅ Set up MongoDB Atlas account
2. ✅ Create cluster and user
3. ✅ Get connection string
4. ✅ Update `.env` file in backend
5. ✅ Start backend server
6. 🚀 Test API endpoints
7. 🚀 Connect your frontend
