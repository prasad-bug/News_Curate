import { useState, useEffect } from 'react';
import API from '../utils/api';
import NewsCard from '../components/NewsCard';
import TopicSelector from '../components/TopicSelector';
import { Loader2 } from 'lucide-react';
import { sampleNews } from '../data/sampleNews';
import { getCategoryFallbackImage } from '../utils/categoryImages';

const TOPICS = ['technology', 'sports', 'business', 'health', 'science', 'entertainment'];

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('technology');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, [selectedTopic]);

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await API.get(`/articles?topic=${selectedTopic}`);
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
            const categoryKey = selectedTopic.toLowerCase();
            // Map some topics to available sample categories if direct match missing
            const samples = sampleNews[categoryKey] ||
                sampleNews[Object.keys(sampleNews).find(k => categoryKey.includes(k))] ||
                sampleNews.technology; // Default fallback
            setArticles(samples);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header and TopicSelector removed as per user request */}

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-hindu-red" />
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {!loading && !error && articles.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-hindu-gray-medium text-lg">
                            No articles found for this topic
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    {articles.map((article, index) => (
                        <NewsCard
                            key={index}
                            article={{
                                ...article,
                                topic: selectedTopic,
                                // Ensure fallback image uses title hash for uniqueness
                                imageUrl: article.imageUrl || article.urlToImage || article.image_url || getCategoryFallbackImage(selectedTopic, article.title)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
