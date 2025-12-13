import { useState, useEffect } from 'react';
import API from '../../utils/api';
import { Trash2, Edit2, Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
        topic: '',
        source: ''
    });

    useEffect(() => {
        // We'll use the public get articles endpoint for listing, 
        // as admin endpoint for listing isn't strictly defined but could be same.
        // Actually, we should probably add get all articles admin endpoint to get UNFILTERED lists,
        // but for now reusing public list is okay or fetching by topics.
        // Let's create a helper to fetch all recent news.
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            // Using existing endpoint, maybe restricted by pagination but good for demo
            const { data } = await API.get('/articles');
            setArticles(data.data);
        } catch (error) {
            toast.error('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingArticle) {
                const { data } = await API.put(`/admin/article/${editingArticle._id}`, formData);
                setArticles(articles.map(a => a._id === editingArticle._id ? data.data : a));
                toast.success('Article updated');
            } else {
                const { data } = await API.post('/admin/article', formData);
                setArticles([data.data, ...articles]);
                toast.success('Article created');
            }
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Describe to delete?')) return;
        try {
            await API.delete(`/admin/article/${id}`);
            setArticles(articles.filter(a => a._id !== id));
            toast.success('Article deleted');
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const openModal = (article = null) => {
        if (article) {
            setEditingArticle(article);
            setFormData({
                title: article.title,
                content: article.content,
                summary: article.summary,
                topic: article.topic,
                source: article.source.name || article.source // Handle object or string
            });
        } else {
            setEditingArticle(null);
            setFormData({ title: '', content: '', summary: '', topic: '', source: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage News</h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-hindu-red text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                    >
                        <Plus className="w-5 h-5" /> Add News
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Topic</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Source</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {articles.map((article) => (
                                <tr key={article._id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{article.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            {article.topic}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {article.source?.name || article.source}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <button onClick={() => openModal(article)} className="text-blue-600 hover:text-blue-900 mr-4">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(article._id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {editingArticle ? 'Edit Article' : 'Add New Article'}
                            </h2>
                            <button onClick={closeModal}><X className="w-6 h-6 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-hindu-red text-gray-900 dark:text-white"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
                                    <select
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                        value={formData.topic}
                                        onChange={e => setFormData({ ...formData, topic: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Topic</option>
                                        {['active', 'world', 'movies', 'sport', 'technology', 'business', 'health', 'science'].map(t => (
                                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                        value={formData.source}
                                        onChange={e => setFormData({ ...formData, source: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Summary</label>
                                <textarea
                                    required
                                    rows="2"
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={formData.summary}
                                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                                <textarea
                                    required
                                    rows="6"
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono text-sm"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end pt-4 space-x-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-hindu-red text-white hover:bg-red-700 rounded-lg font-medium"
                                >
                                    {editingArticle ? 'Update Article' : 'Create Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
