import { Link } from 'react-router-dom';

const sections = [
    { name: 'SPORT', path: '/sport' },
    { name: 'CRICKET', path: '/sport/cricket' },
    { name: 'FOOTBALL', path: '/sport/football' },
    { name: 'HOCKEY', path: '/sport/hockey' },
    { name: 'TENNIS', path: '/sport/tennis' },
    { name: 'ATHLETICS', path: '/sport/athletics' },
    { name: 'MOTORSPORT', path: '/sport/motorsport' },
    { name: 'RACES', path: '/sport/races' },
    { name: 'OTHER SPORTS', path: '/sport/other' },
];

export default function SectionTabs({ activeSection = 'SPORT' }) {
    return (
        <div className="bg-gray-50 border-b border-hindu-gray-light">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center overflow-x-auto scrollbar-hide py-2">
                    {sections.map((section) => (
                        <Link
                            key={section.name}
                            to={section.path}
                            className={`text-xs font-medium px-4 py-2 whitespace-nowrap tracking-wider transition ${section.name === activeSection
                                    ? 'text-hindu-red border-b-2 border-hindu-red font-bold'
                                    : 'text-hindu-gray-dark hover:text-hindu-text'
                                }`}
                        >
                            {section.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
