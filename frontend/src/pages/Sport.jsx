import SectionTabs from '../components/hindu/SectionTabs';
import HeroArticle from '../components/hindu/HeroArticle';
import ArticleGrid from '../components/hindu/ArticleGrid';
import { heroArticle, gridArticles } from '../data/sampleSportNews';

export default function Sport() {
    return (
        <div className="min-h-screen bg-white">
            {/* Section Tabs */}
            <SectionTabs activeSection="SPORT" />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Article */}
                <HeroArticle article={heroArticle} />

                {/* Article Grid */}
                <ArticleGrid articles={gridArticles} />

                {/* Footer Section */}
                <footer className="mt-12 pt-8 border-t border-hindu-gray-light">
                    <div className="text-center text-sm text-hindu-gray-dark">
                        <p className="mb-2">© 2024 NewsCurate</p>
                        <p className="text-xs">
                            A Premium News Experience
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
