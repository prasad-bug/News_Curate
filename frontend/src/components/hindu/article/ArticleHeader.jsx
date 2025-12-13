import { Clock, MapPin } from 'lucide-react';

export default function ArticleHeader({ title, subtitle, date, location, agency }) {
    return (
        <div className="mb-6 border-b border-hindu-gray-light dark:border-gray-700 pb-6 transition-colors duration-300">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-hindu-text dark:text-white leading-tight mb-4 transition-colors">
                {title}
            </h1>

            {subtitle && (
                <h2 className="font-serif text-lg md:text-xl text-hindu-text-light dark:text-gray-300 italic mb-6 leading-relaxed opacity-90 transition-colors">
                    {subtitle}
                </h2>
            )}

            <div className="flex flex-wrap items-center text-xs font-bold text-hindu-gray-dark dark:text-gray-400 uppercase tracking-wide gap-y-2 transition-colors">
                {agency && (
                    <span className="bg-black text-white px-2 py-1 mr-3 rounded-sm">
                        {agency}
                    </span>
                )}

                <div className="flex items-center mr-4">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{date}</span>
                </div>

                {location && (
                    <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{location}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
