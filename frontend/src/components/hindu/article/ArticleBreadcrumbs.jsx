import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArticleBreadcrumbs({ category }) {
    return (
        <div className="flex items-center space-x-2 text-xs font-bold text-hindu-gray-dark dark:text-gray-400 mb-6 uppercase tracking-wider transition-colors duration-300">
            <Link to="/" className="hover:text-hindu-red transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-hindu-gray-light dark:text-gray-600" />
            <Link to={`/${category?.toLowerCase() || 'news'}`} className="hover:text-hindu-red transition-colors">
                {category || 'News'}
            </Link>
        </div>
    );
}
