import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function Summarizer() {
    const [articleText, setArticleText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSummarize = async () => {
        if (!articleText.trim()) {
            toast.error('Please enter some text to summarize');
            return;
        }

        setLoading(true);
        // Simulate AI summarization (you can integrate with a real API later)
        setTimeout(() => {
            const sentences = articleText.split('.').filter(s => s.trim().length > 0);
            const summarySentences = sentences.slice(0, Math.min(3, sentences.length));
            setSummary(summarySentences.join('. ') + '.');
            setLoading(false);
            toast.success('Summary generated!');
        }, 2000);
    };

    const handleCopy = async () => {
        const success = await copyToClipboard(summary);
        if (success) {
            setCopied(true);
            toast.success('Summary copied!');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Sparkles className="w-10 h-10 mr-3 text-primary-600" />
                    AI Article Summarizer
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Get quick summaries of lengthy articles
                </p>
            </div>

            <div className="space-y-6">
                <div className="card p-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Article Text
                    </label>
                    <textarea
                        value={articleText}
                        onChange={(e) => setArticleText(e.target.value)}
                        placeholder="Paste your article text here..."
                        className="input min-h-[200px] resize-none"
                    />
                </div>

                <button
                    onClick={handleSummarize}
                    disabled={loading}
                    className="w-full btn btn-primary flex items-center justify-center"
                >
                    {loading ? (
                        'Generating summary...'
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Summarize
                        </>
                    )}
                </button>

                {summary && (
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Summary
                            </h3>
                            <button
                                onClick={handleCopy}
                                className="btn btn-secondary flex items-center"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-1" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-1" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {summary}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
