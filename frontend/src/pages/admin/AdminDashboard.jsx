import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { Users, FileText, BarChart2, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ users: 0, articles: 0, views: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app we'd have a specific stats endpoint, 
                // but we can reuse existing endpoints for counts or mock it slightly for now
                // Fetching users count (we have get all users)
                const usersRes = await API.get('/admin/users');

                // Fetch articles stats (we have topic stats)
                const topicsRes = await API.get('/admin/topics/stats');

                const totalArticles = topicsRes.data.data.reduce((acc, curr) => acc + curr.articleCount, 0);
                const totalViews = topicsRes.data.data.reduce((acc, curr) => acc + curr.views, 0);

                setStats({
                    users: usersRes.data.count,
                    articles: totalArticles,
                    views: totalViews
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={<Users className="w-8 h-8 text-blue-600" />}
                        title="Total Users"
                        value={stats.users}
                        color="bg-blue-100"
                    />
                    <StatCard
                        icon={<FileText className="w-8 h-8 text-green-600" />}
                        title="Total Articles"
                        value={stats.articles}
                        color="bg-green-100"
                    />
                    <StatCard
                        icon={<BarChart2 className="w-8 h-8 text-purple-600" />}
                        title="Total Views"
                        value={stats.views}
                        color="bg-purple-100"
                    />
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/admin/news" className="group block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                    <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Manage News</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Add, edit, or delete articles</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
                        </div>
                    </Link>

                    <Link to="/admin/users" className="group block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Manage Users</h3>
                                    <p className="text-gray-500 dark:text-gray-400">View users and manage access</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, color }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
            <div className={`p-4 rounded-lg ${color} dark:bg-opacity-20`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}
