import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Create a slug from title or use ID if available
        const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        navigate(`/article/${slug}`, { state: { article, category: article.category } });
    };

    return (
        <div className="group cursor-pointer" onClick={handleClick}>
            {/* Article Image */}
            <div className="mb-3">
                <img
                    src={article.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop';
                        e.target.onerror = null;
                    }}
                />
            </div>

            {/* Article Headline */}
            <h3 className="font-serif text-xl font-bold text-hindu-text dark:text-white leading-tight mb-2 group-hover:text-hindu-red transition-colors">
                {article.title}
            </h3>

            {/* Metadata */}
            <div className="flex items-center space-x-2 text-xs text-hindu-gray-dark dark:text-gray-400 uppercase tracking-wide">
                {article.agency && (
                    <span className="font-medium">{article.agency}</span>
                )}
                {article.location && (
                    <>
                        <span>|</span>
                        <span>{article.location}</span>
                    </>
                )}
            </div>
        </div>
    );
}
