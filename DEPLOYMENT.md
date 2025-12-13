# 🚀 NewsCurate Deployment Guide

## Quick Summary

| Component | Platform | URL After Deploy |
|-----------|----------|------------------|
| Database | MongoDB Atlas | `mongodb+srv://...` |
| Backend | Render | `https://newscurate-api.onrender.com` |
| Frontend | Vercel | `https://newscurate.vercel.app` |

---

## Step 1: Set Up MongoDB Atlas (5 min)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Sign up
2. Create a **FREE** cluster (M0 Sandbox)
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/newscurate?retryWrites=true&w=majority
   ```
5. **Network Access** → Add `0.0.0.0/0` to allow all IPs

---

## Step 2: Push to GitHub

```bash
cd /Users/prasadganeshbhad/Desktop/CFA_Project

# Initialize git if not already
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for deployment"

# Push to GitHub (create repo first on github.com)
git remote add origin https://github.com/YOUR_USERNAME/newscurate.git
git push -u origin main
```

---

## Step 3: Deploy Backend to Render (10 min)

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Configure:
   - **Name**: `newscurate-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   
5. **Environment Variables** (Add these):
   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your Atlas connection string |
   | `JWT_SECRET` | `your-super-secret-key-123` |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | `https://newscurate.vercel.app` |
   | `NEWSDATA_API_KEY` | Your NewsData.io API key |

6. Click **"Create Web Service"**
7. Wait for deploy → Copy your URL (e.g., `https://newscurate-api.onrender.com`)

---

## Step 4: Deploy Frontend to Vercel (5 min)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repo
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   
5. **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://newscurate-api.onrender.com/api` |

6. Click **"Deploy"**
7. Your app is live at: `https://your-project.vercel.app`

---

## Step 5: Update Backend CORS

After frontend is deployed, update backend environment on Render:
- `FRONTEND_URL` = `https://your-project.vercel.app`

---

## 🎉 Done!

Your app is now live at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://newscurate-api.onrender.com`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Update `FRONTEND_URL` in Render env |
| MongoDB connection fails | Check Atlas Network Access (allow all IPs) |
| API calls fail | Verify `VITE_API_URL` in Vercel env |
| Build fails | Check console logs in Render/Vercel |

---

## Environment Variables Checklist

### Backend (Render)
- [ ] `MONGODB_URI`
- [ ] `JWT_SECRET`
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL`
- [ ] `NEWSDATA_API_KEY`

### Frontend (Vercel)
- [ ] `VITE_API_URL`
