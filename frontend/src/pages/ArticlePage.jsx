import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ArticleBreadcrumbs from '../components/hindu/article/ArticleBreadcrumbs';
import ArticleHeader from '../components/hindu/article/ArticleHeader';
import ArticleActions from '../components/hindu/article/ArticleActions';
import ArticleImage from '../components/hindu/article/ArticleImage';
import ArticleContent from '../components/hindu/article/ArticleContent';
import { getCategoryFallbackImage } from '../utils/categoryImages';
import API from '../utils/api';

export default function ArticlePage() {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            // Priority 1: Use article from router state (for live news navigation)
            if (state?.article) {
                setArticle(state.article);
                setLoading(false);
                return;
            }

            // Priority 2: Fetch from database by ID (for saved articles)
            try {
                const { data } = await API.get(`/articles/${id}`);
                if (data.success && data.data) {
                    // Transform saved article data to match expected format
                    const savedArticle = data.data;
                    setArticle({
                        _id: savedArticle._id,
                        title: savedArticle.title,
                        description: savedArticle.summary || savedArticle.content,
                        content: savedArticle.content,
                        urlToImage: savedArticle.imageUrl,
                        image: savedArticle.imageUrl,
                        publishedAt: savedArticle.publishedAt || savedArticle.createdAt,
                        source: { name: savedArticle.source || 'News Curate' },
                        category: savedArticle.topic,
                        topic: savedArticle.topic,
                        url: savedArticle.externalUrl,
                    });
                } else {
                    setError('Article not found');
                }
            } catch (err) {
                console.error('Failed to fetch article:', err);
                setError('Article not found');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
        window.scrollTo(0, 0);
    }, [state, id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
                <Loader2 className="w-8 h-8 animate-spin text-hindu-red" />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-serif font-bold text-hindu-text dark:text-white mb-4">
                    {error || 'Article not found'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    The article you're looking for doesn't exist or has been removed.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-hindu-red text-white rounded-lg hover:bg-red-700 transition"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    // Determine category from Nav state or article data
    const category = state?.category || article.topic || article.category || 'News';
    const fallbackImage = getCategoryFallbackImage(category, article.title);

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen pb-20 pt-8 transition-colors duration-300">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 1. Breadcrumbs */}
                <ArticleBreadcrumbs category={category} />

                {/* 2. Header (Title, metadata) */}
                <ArticleHeader
                    title={article.title}
                    subtitle={article.description}
                    date={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Just Now'}
                    location={article.country || article.location || 'India'}
                    agency={article.source?.name || article.agency || article.source}
                />

                {/* 3. Actions (Share, Save) */}
                <ArticleActions article={article} />

                {/* 4. Main Image */}
                <ArticleImage
                    src={article.urlToImage || article.image_url || article.image || article.imageUrl || fallbackImage}
                    alt={article.title}
                    caption={article.description}
                />

                {/* 5. Article Content */}
                <ArticleContent
                    content={article.content}
                    description={article.description}
                    title={article.title}
                />

            </main>
        </div>
    );
}
