const axios = require('axios');

/**
 * Fetch live news from NewsData.io API
 * @param {string} topic - Topic to search for (e.g., 'technology', 'sports')
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} pageSize - Number of results per page (default: 10)
 * @returns {Promise<Array>} - Array of normalized article objects
 */
const fetchLiveNews = async (topic = 'general', page = 1, pageSize = 10) => {
    try {
        const apiKey = process.env.NEWSDATA_API_KEY;
        const apiUrl = process.env.NEWSDATA_API_URL;

        if (!apiKey) {
            throw new Error('NewsData.io API key is not configured');
        }

        if (!apiUrl) {
            throw new Error('NewsData.io API URL is not configured');
        }

        // Build the API request URL
        const url = `${apiUrl}?apikey=${apiKey}&q=${encodeURIComponent(topic)}&language=en`;

        // Make the API request
        const response = await axios.get(url, {
            timeout: 10000, // 10 second timeout
        });

        // Check if the API returned success
        if (response.data.status !== 'success') {
            throw new Error('NewsData.io API returned an error status');
        }

        // Check if results exist
        if (!response.data.results || response.data.results.length === 0) {
            return [];
        }

        // Normalize and clean the response data
        const normalizedArticles = response.data.results.map((article, index) => ({
            id: `${topic}-${Date.now()}-${index}`, // Generate unique ID
            title: article.title || 'No title available',
            description: article.description || article.content || 'No description available',
            content: article.content || article.description || 'No content available',
            url: article.link || '',
            imageUrl: article.image_url || null,
            source: article.source_id || 'Unknown',
            publishedAt: article.pubDate || new Date().toISOString(),
            topic: topic,
            author: article.creator ? article.creator.join(', ') : null,
            category: article.category ? article.category.join(', ') : null,
        }));

        // Apply pagination manually (NewsData.io free tier doesn't support pagination)
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedArticles = normalizedArticles.slice(startIndex, endIndex);

        return paginatedArticles;
    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // API responded with an error status
            const status = error.response.status;
            const message = error.response.data.message || 'Unknown API error';

            if (status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            } else if (status === 401 || status === 403) {
                throw new Error('Invalid API key. Please check your NewsData.io credentials.');
            } else {
                throw new Error(`NewsData.io API error: ${message}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Unable to reach NewsData.io API. Please check your internet connection.');
        } else {
            // Other errors
            throw new Error(error.message || 'Failed to fetch news from NewsData.io');
        }
    }
};

/**
 * Get a single article by searching with title
 * @param {string} articleId - Article identifier (can be title or URL)
 * @returns {Promise<Object>} - Single article object
 */
const getArticleById = async (articleId) => {
    try {
        // For live news, we can't really get by ID
        // Instead, we'll search for the article by title or return a placeholder
        throw new Error('Direct article fetching by ID is not supported for live news. Please use the article URL instead.');
    } catch (error) {
        throw error;
    }
};

module.exports = {
    fetchLiveNews,
    getArticleById,
};
