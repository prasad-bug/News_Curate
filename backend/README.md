# NewsCurate Backend - Personalized News Reader

A complete MERN stack backend application for a personalized news reader with JWT authentication, role-based access control, and MVC architecture.

## Features

- ✅ User registration and authentication with JWT
- ✅ Role-based access control (User/Admin)
- ✅ Password hashing with bcrypt
- ✅ User preference management
- ✅ Article filtering by topics
- ✅ Save articles to reading list
- ✅ Admin dashboard for article management
- ✅ Topic popularity analytics
- ✅ Global error handling
- ✅ Input validation

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
 ├── config/
 │     └── db.js                  # MongoDB connection
 ├── controllers/
 │     ├── authController.js      # Register, login, getMe
 │     ├── userController.js      # User preferences, saved articles
 │     ├── articleController.js   # Article CRUD operations
 │     └── adminController.js     # Admin features
 ├── middleware/
 │     ├── authMiddleware.js      # JWT verification & role check
 │     └── errorMiddleware.js     # Global error handling
 ├── models/
 │     ├── User.js                # User schema
 │     ├── Article.js             # Article schema
 │     └── Topic.js               # Topic schema
 ├── routes/
 │     ├── authRoutes.js          # Auth endpoints
 │     ├── userRoutes.js          # User endpoints
 │     ├── articleRoutes.js       # Article endpoints
 │     └── adminRoutes.js         # Admin endpoints
 ├── utils/
 │     └── generateToken.js       # JWT token generator
 ├── server.js                    # Main app entry
 ├── package.json
 └── .env.example
```

## Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update the `.env` file with your values:

```env
MONGO_URI=mongodb://localhost:27017/newscurate
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Or use MongoDB Atlas cloud database
```

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run at `http://localhost:5000`

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "token": "jwt_token_here"
    }
  }
  ```

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get Current User
- **GET** `/auth/me`
- **Headers:** `Authorization: Bearer <token>`

---

### User Endpoints (Protected)

#### Get User Preferences
- **GET** `/user/preferences`
- **Headers:** `Authorization: Bearer <token>`

#### Update User Preferences
- **PUT** `/user/preferences`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "topics": ["tech", "sports", "politics"]
  }
  ```

---

### Article Endpoints

#### Get All Articles (Public)
- **GET** `/articles`
- **Query Parameters:** `?topic=tech` (optional)

#### Get Single Article (Public)
- **GET** `/articles/:id`

#### Save Article (Protected)
- **POST** `/articles/save/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Get Saved Articles (Protected)
- **GET** `/articles/saved/list`
- **Headers:** `Authorization: Bearer <token>`

---

### Admin Endpoints (Admin Only)

#### Create Article
- **POST** `/admin/article`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "New Article Title",
    "content": "Full article content here...",
    "summary": "Brief summary",
    "topic": "tech",
    "source": "TechCrunch"
  }
  ```

#### Get Topic Statistics
- **GET** `/admin/topics/stats`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "topic": "tech",
        "views": 1489,
        "articleCount": 45
      }
    ]
  }
  ```

#### Get All Users
- **GET** `/admin/users`
- **Headers:** `Authorization: Bearer <token>`

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common Status Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Creating an Admin User

By default, all registered users have the `user` role. To create an admin:

1. Register a normal user
2. Manually update the user in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or use Mongoose directly in Node.js console.

---

## Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Articles:**
```bash
curl http://localhost:5000/api/articles?topic=tech
```

### Using Postman

1. Import the endpoints into Postman
2. Set the Authorization header: `Bearer <your_token>`
3. Test all endpoints

---

## Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  preferences: {
    topics: [String]
  },
  savedArticles: [ObjectId]
}
```

### Article Schema
```javascript
{
  title: String,
  content: String,
  summary: String,
  topic: String,
  source: String,
  views: Number,
  createdAt: Date
}
```

### Topic Schema
```javascript
{
  name: String (unique),
  popularity: Number
}
```

---

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire after 7 days
- Role-based access control for admin routes
- Input validation on all endpoints
- MongoDB injection protection via Mongoose

---

## Development Tips

1. **Auto-restart server:** Use `npm run dev` with nodemon
2. **Test endpoints:** Use Postman or Thunder Client
3. **View logs:** Check terminal for request logs
4. **Database GUI:** Use MongoDB Compass for easy data viewing

---

## Troubleshooting

**Cannot connect to MongoDB:**
- Check if MongoDB is running
- Verify `MONGO_URI` in `.env` file
- Check MongoDB connection string format

**JWT token errors:**
- Ensure `JWT_SECRET` is set in `.env`
- Check token format: `Bearer <token>`
- Verify token hasn't expired

**CORS errors (when connecting frontend):**
- CORS is enabled by default
- Modify `server.js` if you need specific origins

---

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Keep `JWT_SECRET` secure and random
4. Use environment variables for all sensitive data
5. Enable HTTPS
6. Add rate limiting (consider `express-rate-limit`)
7. Add helmet for security headers

---

## License

ISC

---

## Support

For issues or questions, please create an issue in the repository.

**Happy Coding! 🚀**
