import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { Users, FileText, TrendingUp, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        users: 0,
        articles: 0,
        topics: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [usersRes, topicsRes] = await Promise.all([
                API.get('/admin/users'),
                API.get('/admin/topics/stats'),
            ]);

            setStats({
                users: usersRes.data.count || 0,
                articles: topicsRes.data.data?.reduce((sum, t) => sum + t.articleCount, 0) || 0,
                topics: topicsRes.data.count || 0,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-500' },
        { label: 'Total Articles', value: stats.articles, icon: FileText, color: 'bg-green-500' },
        { label: 'Topics', value: stats.topics, icon: TrendingUp, color: 'bg-purple-500' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your news platform
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div key={index} className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {loading ? '...' : stat.value}
                                </p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    to="/admin/topics"
                    className="card p-6 hover:shadow-xl transition-shadow cursor-pointer"
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg">
                            <BarChart3 className="w-8 h-8 text-primary-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Topic Analytics
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                View popular topics and trends
                            </p>
                        </div>
                    </div>
                </Link>

                <div className="card p-6">
                    <div className="flex items-center space-x-4">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                            <Users className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                User Management
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Manage registered users
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
