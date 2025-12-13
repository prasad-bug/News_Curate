// Sample news data for various categories
export const sampleNews = {
    // INDIA
    india: [
        {
            title: "ISRO prepares for next lunar mission following Chandrayaan success",
            description: "Indian Space Research Organisation announces ambitious plans for retrieving lunar soil samples by 2028.",
            urlToImage: "https://images.unsplash.com/photo-1541873893-ea880463bf93?w=800&h=600&fit=crop",
            source: { name: "PTI" },
            publishedAt: "2024-03-20T10:00:00Z"
        },
        {
            title: "New metro lines approved to ease traffic congestion in Bengaluru",
            urlToImage: "https://images.unsplash.com/photo-1576487241809-4181f0188de4?w=400&h=300&fit=crop",
            source: { name: "News Curate" }
        },
        {
            title: "Record monsoon rains bring relief to farmers in Maharashtra",
            urlToImage: "https://images.unsplash.com/photo-1534951474654-886e563204a5?w=400&h=300&fit=crop",
            source: { name: "PTI" }
        },
        {
            title: "Digital India initiative reaches 100% cloud adoption milestone",
            urlToImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=300&fit=crop",
            source: { name: "ANI" }
        },
        {
            title: "Cultural festival at Red Fort draws record crowd",
            urlToImage: "https://images.unsplash.com/photo-1590480924967-bf4a5df60ae2?w=400&h=300&fit=crop",
            source: { name: "Express" }
        }
    ],

    // WORLD
    world: [
        {
            title: "Global climate summit reaches historic agreement on emissions",
            description: "World leaders unite to pledge carbon neutrality by 2040 in a landmark decision.",
            urlToImage: "https://images.unsplash.com/photo-1621274794943-90335c07b461?w=800&h=600&fit=crop",
            source: { name: "Reuters" },
            publishedAt: "2024-03-21T09:00:00Z"
        },
        {
            title: "Major breakthrough in renewable energy storage technology",
            urlToImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
            source: { name: "AP" }
        },
        {
            title: "Historic peace treaty signed in Geneva",
            urlToImage: "https://images.unsplash.com/photo-1577771746261-285648834db9?w=400&h=300&fit=crop",
            source: { name: "AFP" }
        },
        {
            title: "European markets rally as inflation cools down",
            urlToImage: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?w=400&h=300&fit=crop",
            source: { name: "Bloomberg" }
        }
    ],

    // MOVIES (Entertainment)
    entertainment: [
        {
            title: "Oppenheimer sweeps major awards at the Oscars",
            description: "Christopher Nolan's masterpiece dominates the Academy Awards with 7 wins including Best Picture.",
            urlToImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
            source: { name: "Variety" },
            publishedAt: "2024-03-11T05:00:00Z"
        },
        {
            title: "New Marvel phase announces six upcoming blockbusters",
            urlToImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop",
            source: { name: "Deadline" }
        },
        {
            title: "Cannes Film Festival lineup includes record Indian films",
            urlToImage: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=300&fit=crop",
            source: { name: "THR" }
        }
    ],

    // TECHNOLOGY (Data, Science)
    technology: [
        {
            title: "AI breakthrough: New model solves 50-year-old math problem",
            description: "Researchers claim the new AI system can perform complex reasoning tasks previously thought impossible.",
            urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
            source: { name: "TechCrunch" },
            publishedAt: "2024-03-20T14:30:00Z"
        },
        {
            title: "Next-gen quantum computer achieves supremacy milestone",
            urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
            source: { name: "Wired" }
        },
        {
            title: "Apple announces revolutionary VR headset updates",
            urlToImage: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?w=400&h=300&fit=crop",
            source: { name: "News Curate" }
        }
    ],

    // BUSINESS
    business: [
        {
            title: "Sensex hits all-time high as foreign investments surge",
            description: "Indian stock markets rally on positive global cues and strong domestic earnings reports.",
            urlToImage: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&h=600&fit=crop",
            source: { name: "Mint" },
            publishedAt: "2024-03-21T09:15:00Z"
        },
        {
            title: "Startup funding in India sees 40% growth in Q1",
            urlToImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
            source: { name: "ET" }
        },
        {
            title: "Reserve Bank maintains repo rate for stability",
            urlToImage: "https://images.unsplash.com/photo-1565514020176-dbf2277e6962?w=400&h=300&fit=crop",
            source: { name: "Business Std" }
        }
    ],

    // HEALTH
    health: [
        {
            title: "New study reveals benefits of Mediterranean diet on longevity",
            description: "Comprehensive research spanning 20 years confirms significant health advantages.",
            urlToImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop",
            source: { name: "Healthline" },
            publishedAt: "2024-03-18T08:00:00Z"
        },
        {
            title: "Breakthrough vaccine shows promise against malaria",
            urlToImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
            source: { name: "WHO" }
        },
        {
            title: "Mental health awareness rises among corporate workforce",
            urlToImage: "https://images.unsplash.com/photo-1493836512294-502baa86da8d?w=400&h=300&fit=crop",
            source: { name: "Medical News" }
        }
    ],
    // Aliases
    movies: [
        {
            title: "Oppenheimer sweeps major awards at the Oscars",
            description: "Christopher Nolan's masterpiece dominates the Academy Awards with 7 wins including Best Picture.",
            urlToImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
            source: { name: "Variety" },
            publishedAt: "2024-03-11T05:00:00Z"
        },
        {
            title: "New Marvel phase announces six upcoming blockbusters",
            urlToImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop",
            source: { name: "Deadline" }
        },
        {
            title: "Cannes Film Festival lineup includes record Indian films",
            urlToImage: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=300&fit=crop",
            source: { name: "THR" }
        }
    ]
};

// Helper function to get random samples if category not found
export const getGenericSamples = () => sampleNews.india;
