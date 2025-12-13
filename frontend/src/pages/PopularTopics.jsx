import { useState, useEffect } from 'react';
import API from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Loader2 } from 'lucide-react';

export default function PopularTopics() {
    const [topicsData, setTopicsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopicsStats();
    }, []);

    const fetchTopicsStats = async () => {
        try {
            const { data } = await API.get('/admin/topics/stats');
            setTopicsData(data.data || []);
        } catch (error) {
            console.error('Failed to fetch topic stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <TrendingUp className="w-10 h-10 mr-3 text-primary-600" />
                    Popular Topics
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Analytics and trends for different topics
                </p>
            </div>

            {topicsData.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        No topic data available yet
                    </p>
                </div>
            ) : (
                <>
                    <div className="card p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                            Views by Topic
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={topicsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="topic" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="views" fill="#3b82f6" name="Views" />
                                <Bar dataKey="articleCount" fill="#10b981" name="Articles" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topicsData.map((topic, index) => (
                            <div key={index} className="card p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize mb-2">
                                    {topic.topic}
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Views:</span>
                                        <span className="font-bold text-primary-600">{topic.views}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Articles:</span>
                                        <span className="font-bold text-green-600">{topic.articleCount}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
