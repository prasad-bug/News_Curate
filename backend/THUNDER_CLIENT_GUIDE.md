# 🌩️ Testing NewsCurate API with Thunder Client

## Quick Setup

### 1. Import the Collection (Easiest Way!)

1. Open VS Code
2. Click the **Thunder Client** icon in the sidebar (lightning bolt ⚡)
3. Click **Collections** tab
4. Click **Menu (⋮)** → **Import**
5. Select the file: `thunder-collection.json`
6. Done! All 14 endpoints are ready to test

---

## Step-by-Step Testing Guide

### ✅ Step 1: Start the Server

Make sure your server is running:
```bash
npm run dev
```

### ✅ Step 2: Test Health Check

1. In Thunder Client, open the **NewsCurate API** collection
2. Click on **"Health Check"**
3. Click **Send** button
4. You should see: `{ "success": true, "message": "..." }`

### ✅ Step 3: Register a User

1. Go to **Authentication** folder
2. Click **"Register User"**
3. The body is already filled:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```
4. Click **Send**
5. **IMPORTANT:** Copy the `token` from the response!

### ✅ Step 4: Use the Token

For all protected endpoints, you need to add the token:

1. Click any request that says `Bearer YOUR_TOKEN_HERE`
2. Go to the **Headers** tab
3. Find the `Authorization` header
4. Replace `YOUR_TOKEN_HERE` with your actual token

**Tip:** Keep the word "Bearer" and add a space, then paste your token:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ✅ Step 5: Test Protected Endpoints

Now test these in order:

1. **Get Current User** - Returns your profile
2. **Update Preferences** - Set your topic preferences
3. **Get Preferences** - View saved preferences

---

## Manual Testing (Without Import)

If you prefer to create requests manually:

### 1. Create a New Request

1. Click **Thunder Client** icon
2. Click **New Request**
3. Enter the details below

### 2. Register User Example

- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:** 
  - Click **Headers** tab
  - Add: `Content-Type: application/json`
- **Body:**
  - Click **Body** tab
  - Select **JSON**
  - Paste:
    ```json
    {
      "name": "Test User",
      "email": "test@example.com",
      "password": "password123"
    }
    ```
- Click **Send**

### 3. Login Example

- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### 4. Get Current User (Protected)

- **Method:** GET
- **URL:** `http://localhost:5000/api/auth/me`
- **Headers:** 
  - `Authorization: Bearer YOUR_TOKEN`
  
---

## Testing Admin Endpoints

### 1. Create an Admin User

First, you need to make a user an admin. Use one of these methods:

**Method A: Using MongoDB Compass**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Open database: `newscurate`
4. Open collection: `users`
5. Find your user and click **Edit**
6. Change `role` from `"user"` to `"admin"`
7. Click **Update**

**Method B: Using MongoDB Shell**
```bash
mongosh
use newscurate
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { role: "admin" } }
)
```

**Method C: Using VS Code Extension (MongoDB for VS Code)**
1. Install "MongoDB for VS Code" extension
2. Connect to `mongodb://localhost:27017`
3. Find and edit the user document

### 2. Login as Admin

1. Use **Login** endpoint with admin user credentials
2. Copy the new token

### 3. Test Admin Endpoints

Now use the admin token in these requests:
- **Create Article**
- **Get Topic Stats**
- **Get All Users**

---

## Complete Testing Flow

Here's the recommended order:

1. ✅ **Health Check** - Verify server is running
2. ✅ **Register User** - Create account, get token
3. ✅ **Login** - Login and get token (optional if already registered)
4. ✅ **Get Current User** - Test authentication
5. ✅ **Update Preferences** - Add topics: ["tech", "sports"]
6. ✅ **Get Preferences** - Verify they saved
7. ✅ **Create Article (Admin)** - Create some articles first
8. ✅ **Get All Articles** - See all articles
9. ✅ **Get Articles by Topic** - Filter articles
10. ✅ **Save Article** - Save an article to your list
11. ✅ **Get Saved Articles** - View your saved list
12. ✅ **Get Topic Stats (Admin)** - View analytics

---

## Common Issues & Solutions

### ❌ "Not authorized, no token"
- Make sure you added the `Authorization` header
- Format: `Bearer YOUR_TOKEN` (with space after Bearer)

### ❌ "Not authorized, token failed"
- Token might be expired (expires after 7 days)
- Login again to get a new token

### ❌ "Not authorized as admin"
- Your user role is still "user"
- Follow the "Create an Admin User" steps above

### ❌ "Article not found"
- Replace `ARTICLE_ID_HERE` with actual article ID
- Create articles first using the admin endpoint

### ❌ "User already exists"
- Email is already registered
- Use a different email or use the Login endpoint

---

## Quick Tips

💡 **Save your token as an environment variable:**
1. In Thunder Client, click **Env** tab
2. Create new environment "Local"
3. Add variable: `token` = `your_token_value`
4. In requests, use: `{{token}}`

💡 **Organize your tests:**
- Use the folder structure in the collection
- Save common requests for easy access

💡 **View response data:**
- Thunder Client shows formatted JSON
- Check the status code (200, 201 = success)
- Look at response time and size

---

## Need Help?

Check the [README.md](README.md) for complete API documentation!

**Happy Testing! 🚀**
