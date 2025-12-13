import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookmarkPlus, Share2, ExternalLink, Clock, BookmarkCheck } from 'lucide-react';
import { formatDate } from '../utils/helpers';
import ShareModal from './ShareModal';
import API from '../utils/api';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

export default function NewsCard({ article }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showShareModal, setShowShareModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleCardClick = (e) => {
        // Prevent navigation if clicking on buttons
        if (e.target.closest('button') || e.target.closest('a')) return;

        const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        // Use topic as category, or fallback to 'News'
        navigate(`/article/${slug}`, { state: { article, category: article.topic || 'News' } });
    };

    const handleSave = async () => {
        // ... existing save logic ...
        if (!isAuthenticated) {
            toast.error('Please login to save articles');
            return;
        }

        setSaving(true);
        try {
            await API.post('/articles/save', {
                title: article.title,
                description: article.description,
                url: article.url,
                imageUrl: article.imageUrl,
                source: article.source,
                publishedAt: article.publishedAt,
                topic: article.topic,
            });
            setIsSaved(true);
            toast.success('Article saved!');
        } catch (error) {
            if (error.response?.data?.message?.includes('already saved')) {
                setIsSaved(true);
                toast.error('Article already saved');
            } else {
                toast.error('Failed to save article');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div
                className="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={handleCardClick}
            >
                {(article.imageUrl || article.urlToImage || article.image_url || article.image) && (
                    <img
                        src={article.imageUrl || article.urlToImage || article.image_url || article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop';
                            e.target.onerror = null; // Prevent infinite loop
                        }}
                    />
                )}

                <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase">
                            {article.topic}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(article.publishedAt)}
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {article.source?.name || (typeof article.source === 'string' ? article.source : 'News')}
                        </span>

                        <div className="flex space-x-2">
                            <button
                                onClick={handleSave}
                                disabled={saving || isSaved}
                                className={`p-2 rounded-lg transition ${isSaved
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                                    }`}
                                title={isSaved ? 'Saved' : 'Save article'}
                            >
                                {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => setShowShareModal(true)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition"
                                title="Share article"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>

                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition"
                                title="Read full article"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {showShareModal && (
                <ShareModal
                    article={article}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </>
    );
}
