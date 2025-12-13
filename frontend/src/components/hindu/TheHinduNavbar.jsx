import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, X, Moon, Sun, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function TheHinduNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const categories = [
        'India', 'World', 'Movies', 'Sport', 'Data', 'Health', 'Opinion', 'Science', 'Business', 'Premium'
    ];

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 border-b border-hindu-gray-light dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left: Hamburger + Search */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
                                aria-label="Menu"
                            >
                                <Menu className="w-6 h-6 text-hindu-text dark:text-gray-100" />
                            </button>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`p-2 rounded transition ${isSearchOpen ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5 text-hindu-text dark:text-gray-100" />
                            </button>
                        </div>

                        {/* Center: NEWSCURATE Logo */}
                        <Link to="/sport" className="flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <h1 className="font-serif text-2xl md:text-3xl font-bold text-hindu-text dark:text-white tracking-wide">
                                    NEWS
                                </h1>
                                <img
                                    src="/logo-emblem.png"
                                    alt="Emblem"
                                    className="h-8 md:h-10 w-auto filter dark:invert"
                                />
                                <h1 className="font-serif text-2xl md:text-3xl font-bold text-hindu-text dark:text-white tracking-wide">
                                    CURATE
                                </h1>
                            </div>
                        </Link>

                        {/* Right: Theme Toggle + Login + Subscribe */}
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <Moon className="w-5 h-5 text-hindu-text dark:text-gray-100" />
                                )}
                            </button>

                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="hidden md:block text-sm font-bold text-hindu-red hover:underline"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Hello, {user?.fullName || 'User'}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="px-3 md:px-4 py-2 text-sm font-medium text-hindu-text dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition border border-gray-200 dark:border-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-3 md:px-4 py-2 text-sm font-medium text-hindu-text dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-3 md:px-4 py-2 text-sm font-medium bg-hindu-red text-white rounded hover:bg-hindu-red-dark transition"
                                    >
                                        Subscribe
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Search Bar (Expandable) */}
                    {isSearchOpen && (
                        <div className="pb-4 animate-in slide-in-from-top-2 duration-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search news..."
                                    className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-800 border-none rounded focus:ring-1 focus:ring-hindu-red text-hindu-text dark:text-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    autoFocus
                                />
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Sidebar Drawer (Overlay) */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[60] flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-80 max-w-[85vw] bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col overflow-y-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition z-10"
                        >
                            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>

                        {/* Sections Header */}
                        <div className="pt-16 px-4">
                            <h3 className="text-gray-500 dark:text-gray-400 uppercase text-sm font-medium tracking-wider pb-3">
                                Sections
                            </h3>
                        </div>

                        {/* Category Navigation */}
                        <nav className="flex-1">
                            {/* Home */}
                            <Link
                                to="/"
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-gray-800 dark:text-gray-200 font-medium">Home</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-hindu-red transition-colors" />
                            </Link>

                            {/* Category Items */}
                            {categories.map(cat => (
                                <Link
                                    key={cat}
                                    to={`/${cat.toLowerCase()}`}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-gray-800 dark:text-gray-200 font-medium">{cat}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-hindu-red transition-colors" />
                                </Link>
                            ))}

                            {/* Divider */}
                            <div className="border-t border-gray-200 dark:border-gray-700 my-4 mx-4"></div>

                            {/* Saved Articles Section Header */}
                            <h3 className="text-gray-500 dark:text-gray-400 uppercase text-sm font-medium tracking-wider px-4 pt-2 pb-3">
                                Saved Articles
                            </h3>

                            {/* Saved Articles Link */}
                            <Link
                                to="/saved"
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-gray-800 dark:text-gray-200 font-medium">View Saved Articles</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-hindu-red transition-colors" />
                            </Link>

                            {/* Divider */}
                            <div className="border-t border-gray-200 dark:border-gray-700 my-4 mx-4"></div>

                            {/* Tools Section Header */}
                            <h3 className="text-gray-500 dark:text-gray-400 uppercase text-sm font-medium tracking-wider px-4 pt-2 pb-3">
                                Tools
                            </h3>

                            {/* AI Summarizer */}
                            <Link
                                to="/summarizer"
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-gray-800 dark:text-gray-200 font-medium">AI Summarizer</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-hindu-red transition-colors" />
                            </Link>

                            {/* Admin Link - Only visible to Admins */}
                            <AdminLink setIsMenuOpen={setIsMenuOpen} />
                        </nav>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                                © 2024 News Curate
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Helper component for admin link
function AdminLink({ setIsMenuOpen }) {
    const { user } = useAuth();

    if (user?.role !== 'admin') return null;

    return (
        <Link
            to="/admin"
            className="flex items-center justify-between px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
            onClick={() => setIsMenuOpen(false)}
        >
            <span className="text-hindu-red font-medium">Admin Dashboard</span>
            <ChevronRight className="w-4 h-4 text-hindu-red transition-colors" />
        </Link>
    );
}
