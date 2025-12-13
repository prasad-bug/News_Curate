import { useNavigate } from 'react-router-dom';

export default function HeroArticle({ article }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Create a slug from title or use ID if available
        const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        navigate(`/article/${slug}`, { state: { article, category: article.category } });
    };

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-hindu-gray-light dark:border-gray-700 pb-8 mb-8 cursor-pointer group transition-colors duration-300" onClick={handleClick}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Large Image - Left Side */}
                <div className="lg:col-span-3">
                    <img
                        src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop'}
                        alt={article.title}
                        className="w-full h-64 lg:h-96 object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
                            e.target.onerror = null;
                        }}
                    />
                </div>

                {/* Title and Metadata - Right Side */}
                <div className="lg:col-span-2 flex flex-col justify-center">
                    <h2 className="font-serif text-3xl lg:text-4xl font-bold text-hindu-text dark:text-white leading-tight mb-4 group-hover:text-hindu-red transition-colors">
                        {article.title}
                    </h2>

                    {article.subtitle && (
                        <p className="text-lg text-hindu-text-light dark:text-gray-300 mb-4 leading-relaxed">
                            {article.subtitle}
                        </p>
                    )}

                    {/* Fallback description if no subtitle */}
                    {!article.subtitle && article.description && (
                        <p className="text-lg text-hindu-text-light dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                            {article.description}
                        </p>
                    )}

                    <div className="flex items-center space-x-2 text-xs text-hindu-gray-dark dark:text-gray-400 uppercase tracking-wide">
                        {article.agency && (
                            <span className="font-semibold">{article.agency}</span>
                        )}
                        {article.location && (
                            <>
                                <span>|</span>
                                <span>{article.location}</span>
                            </>
                        )}
                        {article.time && (
                            <>
                                <span>|</span>
                                <span>{article.time}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
