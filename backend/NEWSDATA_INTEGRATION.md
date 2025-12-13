# 🌐 NewsData.io Integration Setup

## Quick Start

Your backend now fetches **live real-time news** from NewsData.io instead of storing articles in MongoDB!

---

## 1️⃣ Get Your API Key

1. Go to [NewsData.io](https://newsdata.io/)
2. Sign up for a **free account**
3. Get your API key from the dashboard
4. Free tier: **200 requests per day**

---

## 2️⃣ Configure Your Backend

Your `.env` file already has the configuration! Just replace the API key:

```env
# NewsData.io API Configuration
NEWSDATA_API_KEY=your_actual_api_key_here
NEWSDATA_API_URL=https://newsdata.io/api/1/news
```

---

## 3️⃣ Restart the Server

```bash
# Stop the current server (Ctrl+C if running)
npm run dev
```

That's it! Your backend will now fetch live news! 🎉

---

## 📡 How It Works

### **GET /api/articles?topic=technology**

1. Backend receives request with topic
2. Calls NewsData.io API
3. Fetches live real-time articles
4. Normalizes and cleans the data
5. Returns formatted articles to frontend

### **Response Format:**

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "unique-id",
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://...",
      "imageUrl": "https://...",
      "source": "BBC News",
      "publishedAt": "2025-12-11T...",
      "topic": "technology"
    }
  ],
  "source": "NewsData.io Live Feed"
}
```

---

## 🧪 Testing with Thunder Client

### 1. Get Live News

**Request:**
- Method: `GET`
- URL: `http://localhost:5001/api/articles?topic=technology`

**Response:** Live articles from NewsData.io

### 2. Save an Article

**Request:**
- Method: `POST`
- URL: `http://localhost:5001/api/articles/save`
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Body (JSON):
```json
{
  "title": "Article Title from live news",
  "description": "Description text",
  "url": "https://original-article-url.com",
  "imageUrl": "https://image-url.com/image.jpg",
  "source": "BBC News",
  "publishedAt": "2025-12-11T12:00:00Z",
  "topic": "technology"
}
```

### 3. Get Saved Articles

**Request:**
- Method: `GET`
- URL: `http://localhost:5001/api/articles/saved/list`
- Headers: `Authorization: Bearer YOUR_TOKEN`

---

## 🔍 Supported Topics

NewsData.io supports searching for any topic. Popular ones:

- `technology` / `tech`
- `sports`
- `business`
- `entertainment`
- `health`
- `science`
- `politics`
- `world`
- Or any custom search term!

---

## ⚠️ Error Handling

### **No API Key:**
```json
{
  "success": false,
  "message": "NewsData.io API key is not configured"
}
```

### **Rate Limit Exceeded:**
```json
{
  "success": false,
  "message": "API rate limit exceeded. Please try again later."
}
```

### **No Results:**
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

---

## 💾 Database Usage

### **What's Stored in MongoDB:**
- User accounts and authentication
- User preferences (topic selections)
- Saved articles (when users save a live article)
- Custom admin articles (optional)

### **What's NOT Stored:**
- Live news articles (fetched from API)
- Article content from NewsData.io

---

## 🚀 Admin Features

Admins can still create **custom articles** that appear in the database:

**POST /api/admin/article**
```json
{
  "title": "Custom Article",
  "content": "Full content...",
  "summary": "Brief summary",
  "topic": "tech",
  "source": "Internal"
}
```

These will be marked with `isCustom: true` in the database.

---

## 📊 Rate Limits & Best Practices

### **Free Tier Limits:**
- 200 requests per day
- Rate: ~8 requests per hour

### **Tips to Avoid Hitting Limits:**
1. Cache results on frontend
2. Implement request throttling
3. Use pagination wisely
4. Upgrade to paid plan for production

---

## 🔧 Troubleshooting

### Server Won't Start?
```bash
# Check if your API key is set
cat .env | grep NEWSDATA

# Should show:
# NEWSDATA_API_KEY=your_key_here
# NEWSDATA_API_URL=https://newsdata.io/api/1/news
```

### Getting API Errors?
1. Verify your API key is valid
2. Check you haven't exceeded rate limits
3. Test the API directly: https://newsdata.io/dashboard

### No Results?
- Try different topics
- Check the topic spelling
- Some topics may have limited news coverage

---

## 📚 API Documentation

Full NewsData.io API docs: https://newsdata.io/documentation

---

**Happy News Curating! 📰✨**
