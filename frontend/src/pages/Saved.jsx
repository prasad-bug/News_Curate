import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { BookMarked, Loader2, Trash2, ExternalLink, Share2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Saved() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    useEffect(() => {
        fetchSavedArticles();
    }, []);

    const fetchSavedArticles = async () => {
        try {
            const { data } = await API.get('/articles/saved/list');
            setArticles(data.data || []);
        } catch (error) {
            console.error('Failed to fetch saved articles:', error);
            toast.error('Failed to load saved articles');
        } finally {
            setLoading(false);
        }
    };

    const handleUnsave = async (articleId) => {
        setRemovingId(articleId);
        try {
            await API.delete(`/articles/unsave/${articleId}`);
            setArticles(articles.filter(a => a._id !== articleId));
            toast.success('Article removed from saved list');
        } catch (error) {
            console.error('Failed to unsave article:', error);
            toast.error('Failed to remove article');
        } finally {
            setRemovingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        const now = new Date();
        const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffHours < 48) return 'Yesterday';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
                <Loader2 className="w-8 h-8 animate-spin text-hindu-red" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6 border-b border-hindu-gray-light dark:border-gray-700 pb-4">
                    <h1 className="font-serif text-4xl font-bold text-hindu-text dark:text-white mb-2 flex items-center">
                        <BookMarked className="w-10 h-10 mr-3 text-hindu-red" />
                        Saved Articles
                    </h1>
                    <p className="text-hindu-gray-dark dark:text-gray-400 text-sm">
                        Your personal reading list • {articles.length} article{articles.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {articles.length === 0 ? (
                    <div className="text-center py-20">
                        <BookMarked className="w-16 h-16 mx-auto text-hindu-gray-medium mb-4" />
                        <p className="text-hindu-gray-medium text-lg">
                            No saved articles yet
                        </p>
                        <p className="text-hindu-gray-medium text-sm mt-2">
                            Start saving articles to read them later
                        </p>
                        <Link
                            to="/"
                            className="inline-block mt-6 px-6 py-2 bg-hindu-red text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Browse Articles
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={(e) => {
                                    // Don't navigate if clicking action buttons
                                    if (e.target.closest('button') || e.target.closest('a')) return;
                                    navigate(`/article/${article._id}`);
                                }}
                            >
                                {/* Article Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={article.imageUrl || article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop'}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop';
                                        }}
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-hindu-red text-white text-xs font-bold px-2 py-1 rounded uppercase">
                                            {article.topic || 'News'}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="p-4">
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                                    </div>

                                    <h3 className="font-serif text-lg font-bold text-hindu-text dark:text-white leading-tight mb-2 line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-hindu-gray-dark dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                        {article.summary || article.content || article.description}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span className="font-medium">{article.source || 'News Curate'}</span>
                                    </div>
                                </div>

                                <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <a
                                            href={article.externalUrl || article.url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                if (!article.externalUrl && !article.url) {
                                                    e.preventDefault();
                                                    toast.error('Article URL not available');
                                                }
                                            }}
                                            className="flex items-center text-hindu-gray-dark dark:text-gray-400 hover:text-hindu-red text-sm"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            Read
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(article.externalUrl || window.location.href);
                                                toast.success('Link copied!');
                                            }}
                                            className="flex items-center text-hindu-gray-dark dark:text-gray-400 hover:text-hindu-red text-sm"
                                        >
                                            <Share2 className="w-4 h-4 mr-1" />
                                            Share
                                        </button>
                                    </div>

                                    {/* Unsave Button */}
                                    <button
                                        onClick={() => handleUnsave(article._id)}
                                        disabled={removingId === article._id}
                                        className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                        title="Remove from saved"
                                    >
                                        {removingId === article._id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Remove
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
