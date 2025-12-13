import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Newspaper, BookMarked, LayoutDashboard, LogOut, LogIn, Moon, Sun } from 'lucide-react';

export default function Navbar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Newspaper className="w-8 h-8 text-primary-600" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                NewsCurate
                            </span>
                        </Link>

                        <div className="hidden md:flex ml-10 space-x-4">
                            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Home
                            </Link>

                            {isAuthenticated && (
                                <>
                                    <Link to="/saved" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <BookMarked className="w-4 h-4 mr-1" />
                                        Saved
                                    </Link>
                                    <Link to="/summarizer" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        AI Summarizer
                                    </Link>
                                </>
                            )}

                            {isAdmin && (
                                <Link to="/admin" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <LayoutDashboard className="w-4 h-4 mr-1" />
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700" />
                            )}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                            >
                                <LogIn className="w-4 h-4 mr-1" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
