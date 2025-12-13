import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { copyToClipboard, generateShareLink } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function ShareModal({ article, onClose }) {
    const [note, setNote] = useState('');
    const [copied, setCopied] = useState(false);

    const shareLink = generateShareLink(article);

    const handleCopy = async () => {
        const shareText = note
            ? `${article.title}\n\n${note}\n\nRead more: ${article.url}`
            : `${article.title}\n\nRead more: ${article.url}`;

        const success = await copyToClipboard(shareText);
        if (success) {
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } else {
            toast.error('Failed to copy');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Share Article
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {article.title}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Add a note (optional)
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Share your thoughts about this article..."
                        className="input min-h-[100px] resize-none"
                        maxLength={280}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {note.length}/280 characters
                    </p>
                </div>

                <button
                    onClick={handleCopy}
                    className="w-full btn btn-primary flex items-center justify-center"
                >
                    {copied ? (
                        <>
                            <Check className="w-5 h-5 mr-2" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5 mr-2" />
                            Copy Share Link
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
