export default function TopicSelector({ topics, selectedTopic, onSelectTopic }) {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-3">
                {topics.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => onSelectTopic(topic)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${selectedTopic === topic
                                ? 'bg-primary-600 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}
