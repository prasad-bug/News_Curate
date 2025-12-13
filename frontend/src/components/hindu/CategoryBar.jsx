import { Link } from 'react-router-dom';

const categories = [
    { name: 'India', path: '/india' },
    { name: 'World', path: '/world' },
    { name: 'Movies', path: '/movies' },
    { name: 'Sport', path: '/sport' },
    { name: 'Data', path: '/data' },
    { name: 'Health', path: '/health' },
    { name: 'Opinion', path: '/opinion' },
    { name: 'Science', path: '/science' },
    { name: 'Business', path: '/business' },
    { name: 'Premium', path: '/premium' },
];

export default function CategoryBar({ activeCategory = 'Sport' }) {
    return (
        <div className="bg-white dark:bg-gray-900 border-b border-hindu-gray-light dark:border-gray-700 py-3 sticky top-16 z-40 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-6 overflow-x-auto scrollbar-hide py-1">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={category.path}
                            className={`whitespace-nowrap text-sm font-bold tracking-wider uppercase transition-colors ${activeCategory === category.name
                                    ? 'text-hindu-red border-b-2 border-hindu-red pb-1'
                                    : 'text-hindu-gray-dark dark:text-gray-400 hover:text-hindu-red'
                                }`}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
