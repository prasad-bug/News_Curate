import ArticleCard from './ArticleCard';

export default function ArticleGrid({ articles }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
                <div key={index} className="border-b md:border-b-0 pb-6 md:pb-0">
                    <ArticleCard article={article} />
                </div>
            ))}
        </div>
    );
}
