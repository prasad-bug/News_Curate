import { useState, useEffect } from 'react';
import API from '../utils/api';
import ArticleCard from '../components/hindu/ArticleCard';
import HeroArticle from '../components/hindu/HeroArticle';
import { Loader2 } from 'lucide-react';
import { sampleNews, getGenericSamples } from '../data/sampleNews';
import { getCategoryFallbackImage } from '../utils/categoryImages';

export default function CategoryPage({ category, title, description }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, [category]);

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await API.get(`/articles?topic=${category.toLowerCase()}`);
            if (data.data && data.data.length > 0) {
                // Filter duplicates based on title
                const uniqueArticles = Array.from(new Map(data.data.map(item => [item.title, item])).values());
                setArticles(uniqueArticles);
            } else {
                throw new Error('No articles found');
            }
        } catch (err) {
            console.warn('API call failed, using sample data:', err);
            // Fallback to sample data based on category
            const categoryKey = category.toLowerCase();
            const samples = sampleNews[categoryKey] ||
                sampleNews[Object.keys(sampleNews).find(k => categoryKey.includes(k))] ||
                getGenericSamples();
            setArticles(samples);
            // Don't show error to user, just show content
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 border-b border-hindu-gray-light dark:border-gray-700 pb-6">
                    <h1 className="font-serif text-5xl font-bold text-hindu-text dark:text-white mb-3">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-hindu-gray-dark text-sm uppercase tracking-wide">
                            {description}
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-hindu-red" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {/* No Articles */}
                {!loading && !error && articles.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-hindu-gray-medium text-lg">
                            No articles found for this category
                        </p>
                    </div>
                )}

                {/* Article Grid */}
                {!loading && !error && articles.length > 0 && (
                    <>
                        {/* Hero Article (First Article) */}
                        {articles[0] && (
                            <div className="mb-8 pb-8 border-b border-hindu-gray-light">
                                <HeroArticle
                                    article={{
                                        ...articles[0],
                                        image: articles[0].urlToImage || articles[0].image_url || getCategoryFallbackImage(category, articles[0].title),
                                        category: category
                                    }}
                                />
                            </div>
                        )}

                        {/* Remaining Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.slice(1).map((item, index) => (
                                <ArticleCard
                                    key={index}
                                    article={{
                                        ...item,
                                        image: item.urlToImage || item.image_url || getCategoryFallbackImage(category, item.title),
                                        category: category,
                                        // Ensure backward compatibility for display
                                        agency: item.source?.name || 'NEWS',
                                        location: item.country || ''
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
