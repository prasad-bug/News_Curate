import { useState } from 'react';
import { BookmarkPlus, BookmarkCheck, Share2, Facebook, Twitter, Mail, MessageCircle, Check, Link } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import API from '../../../utils/api';
import toast from 'react-hot-toast';

export default function ArticleActions({ article }) {
    const { isAuthenticated } = useAuth();
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const articleUrl = window.location.href;
    const articleTitle = article?.title || 'Check out this article';
    const encodedUrl = encodeURIComponent(articleUrl);
    const encodedTitle = encodeURIComponent(articleTitle);

    // Save article (Read Later)
    const handleSaveArticle = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to save articles');
            return;
        }

        if (isSaving) return;

        setIsSaving(true);
        try {
            await API.post('/articles/save', {
                title: article?.title,
                description: article?.description,
                url: article?.url || article?.link || articleUrl, // Use original source URL
                imageUrl: article?.urlToImage || article?.image_url || article?.image,
                source: article?.source?.name || 'News Curate',
                publishedAt: article?.publishedAt || new Date().toISOString(),
                topic: article?.category || article?.topic || 'general'
            });
            setIsSaved(true);
            toast.success('Article saved to Read Later!');
        } catch (error) {
            if (error.response?.status === 400 && error.response?.data?.message?.includes('already')) {
                setIsSaved(true);
                toast.success('Article already saved!');
            } else {
                toast.error('Failed to save article');
            }
        } finally {
            setIsSaving(false);
        }
    };

    // Share on WhatsApp
    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, '_blank');
    };

    // Share on Facebook
    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
    };

    // Share on Twitter/X
    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank');
    };

    // Share via Email
    const shareViaEmail = () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`;
    };

    // Copy link to clipboard
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(articleUrl);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Failed to copy link');
        }
    };

    // Native share (for mobile)
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: articleTitle,
                    url: articleUrl
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setShowShareMenu(!showShareMenu);
                }
            }
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    const iconClass = "w-5 h-5 text-hindu-gray-dark dark:text-gray-400 hover:text-hindu-red dark:hover:text-hindu-red transition-colors cursor-pointer";

    return (
        <div className="flex items-center justify-between mb-8 py-2 relative">
            <div className="flex items-center space-x-6">
                {/* Read Later Button */}
                <div className="flex items-center space-x-2 border-r border-hindu-gray-light dark:border-gray-700 pr-6">
                    <button
                        onClick={handleSaveArticle}
                        disabled={isSaving}
                        className={`flex items-center space-x-2 group ${isSaved ? 'text-hindu-red' : ''}`}
                    >
                        {isSaved ? (
                            <BookmarkCheck className="w-5 h-5 text-hindu-red" />
                        ) : (
                            <BookmarkPlus className={`w-5 h-5 ${isSaving ? 'animate-pulse' : ''} ${iconClass}`} />
                        )}
                        <span className={`text-xs font-bold uppercase hidden md:block ${isSaved ? 'text-hindu-red' : 'text-hindu-gray-dark dark:text-gray-400 group-hover:text-hindu-red'}`}>
                            {isSaved ? 'Saved' : 'Read Later'}
                        </span>
                    </button>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center space-x-5">
                    <button onClick={shareOnWhatsApp} className={iconClass} title="Share on WhatsApp">
                        <MessageCircle className="w-5 h-5" />
                    </button>
                    <button onClick={shareOnFacebook} className={iconClass} title="Share on Facebook">
                        <Facebook className="w-5 h-5" />
                    </button>
                    <button onClick={shareOnTwitter} className={iconClass} title="Share on Twitter/X">
                        <Twitter className="w-5 h-5" />
                    </button>
                    <button onClick={shareViaEmail} className={iconClass} title="Share via Email">
                        <Mail className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Share Button with Dropdown */}
            <div className="relative">
                <button
                    onClick={handleNativeShare}
                    className="flex items-center space-x-2 text-hindu-gray-dark dark:text-gray-400 hover:text-hindu-text dark:hover:text-white transition-colors"
                >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase hidden md:block">Share</span>
                </button>

                {/* Share Dropdown Menu */}
                {showShareMenu && (
                    <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 min-w-[160px] z-50 border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={copyLink}
                            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link className="w-4 h-4" />}
                            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                        <button
                            onClick={shareOnWhatsApp}
                            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp</span>
                        </button>
                        <button
                            onClick={shareOnFacebook}
                            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Facebook className="w-4 h-4" />
                            <span>Facebook</span>
                        </button>
                        <button
                            onClick={shareOnTwitter}
                            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Twitter className="w-4 h-4" />
                            <span>Twitter/X</span>
                        </button>
                        <button
                            onClick={shareViaEmail}
                            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
