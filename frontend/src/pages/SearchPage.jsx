import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import ArticleCard from '../components/hindu/ArticleCard';
import HeroArticle from '../components/hindu/HeroArticle';
import { Loader2, Search } from 'lucide-react';
import { sampleNews, getGenericSamples } from '../data/sampleNews';
import { getCategoryFallbackImage } from '../utils/categoryImages';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            fetchArticles();
        }
    }, [query]);

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        try {
            // Backend maps 'topic' parameter to 'q' (query) for external API
            const { data } = await API.get(`/articles?topic=${encodeURIComponent(query)}`);

            if (data.data && data.data.length > 0) {
                // Filter duplicates based on title
                const uniqueArticles = Array.from(new Map(data.data.map(item => [item.title, item])).values());
                setArticles(uniqueArticles);
            } else {
                setArticles([]); // Empty results
            }
        } catch (err) {
            console.warn('API call failed, using sample data:', err);
            // On search error, try to find a relevant sample category, otherwise use generic samples
            const categoryKey = query.toLowerCase();
            // Try direct match or partial match
            let samples = sampleNews[categoryKey] ||
                sampleNews[Object.keys(sampleNews).find(k => categoryKey.includes(k) || k.includes(categoryKey))];

            // If no relevant sample found, use generic (India) samples to ensure we show something
            if (!samples) {
                samples = getGenericSamples();
            }

            setArticles(samples);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 border-b border-hindu-gray-light dark:border-gray-700 pb-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <Search className="w-8 h-8 text-hindu-red" />
                        <h1 className="font-serif text-4xl font-bold text-hindu-text dark:text-white">
                            Search Results
                        </h1>
                    </div>
                    <p className="text-hindu-gray-dark dark:text-gray-400 text-lg">
                        {query ? `Showing results for "${query}"` : 'Enter a search term'}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-hindu-red" />
                    </div>
                )}

                {/* No Articles */}
                {!loading && !error && articles.length === 0 && query && (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-hindu-gray-medium dark:text-gray-400 text-lg mb-2">
                            No articles found matching "{query}"
                        </p>
                        <p className="text-sm text-hindu-gray-dark dark:text-gray-500">
                            Try simpler keywords or check your spelling.
                        </p>
                    </div>
                )}

                {!loading && !query && (
                    <div className="text-center py-20">
                        <p className="text-hindu-gray-medium dark:text-gray-400 text-lg">
                            Please enter a keyword to search news.
                        </p>
                    </div>
                )}

                {/* Article Grid */}
                {!loading && articles.length > 0 && (
                    <>
                        {/* Hero Article (First Result) */}
                        {articles[0] && (
                            <div className="mb-8 pb-8 border-b border-hindu-gray-light dark:border-gray-700">
                                <HeroArticle
                                    article={{
                                        ...articles[0],
                                        image: articles[0].urlToImage || articles[0].image_url || getCategoryFallbackImage('search', articles[0].title),
                                        category: 'Search Result'
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
                                        image: item.urlToImage || item.image_url || getCategoryFallbackImage('search', item.title),
                                        category: 'Search Result',
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
