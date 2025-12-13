export default function ArticleImage({ src, alt, caption }) {
    return (
        <div className="mb-8">
            <div className="relative w-full aspect-video bg-gray-100 overflow-hidden mb-3">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop';
                        e.target.onerror = null;
                    }}
                />
            </div>
            {caption && (
                <p className="text-sm text-hindu-gray-dark italic leading-relaxed border-l-4 border-hindu-red pl-3">
                    {caption}
                </p>
            )}
            {!caption && (
                <p className="text-sm text-hindu-gray-dark italic leading-relaxed border-l-4 border-hindu-red pl-3">
                    {alt}
                </p>
            )}
        </div>
    );
}
