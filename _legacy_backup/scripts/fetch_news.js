const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();

const FEEDS = [
    {
        name: 'Waste Dive',
        url: 'https://www.wastedive.com/feeds/news/'
    },
    {
        name: 'TechCrunch - Robotics',
        url: 'https://techcrunch.com/category/robotics/feed/'
    },
    {
        name: 'IEEE Spectrum - Robotics',
        url: 'https://spectrum.ieee.org/feeds/topic/robotics'
    },
    {
        name: 'ScienceDaily - Artificial Intelligence',
        url: 'https://www.sciencedaily.com/rss/computers_math/artificial_intelligence.xml'
    },
    {
        name: 'Waste360',
        url: 'https://www.waste360.com/rss.xml'
    },
    {
        name: 'Google News - Waste Tech (Global)',
        url: 'https://news.google.com/rss/search?q=waste+management+technology+when:7d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'Google News - Waste Tech (INDIA)',
        url: 'https://news.google.com/rss/search?q=(waste+management+india+OR+swachh+bharat+OR+cpcb+OR+epr+credits)+when:7d&hl=en-IN&gl=IN&ceid=IN:en'
    },
    {
        name: 'Down To Earth (Policy)',
        url: 'https://www.downtoearth.org.in/rss/waste'
    },
    {
        name: 'Recycling Today (Global)',
        url: 'https://www.recyclingtoday.com/rss'
    }
];

async function fetchNews() {
    console.log('🕷️ Spider Starting... Crawling for Waste Management News...');

    let allNews = [];

    for (const feed of FEEDS) {
        try {
            console.log(`📡 Fetching ${feed.name}...`);
            const feedData = await parser.parseURL(feed.url);

            const items = feedData.items.map(item => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                contentSnippet: item.contentSnippet || item.content || '',
                source: feed.name,
                isoDate: item.isoDate ? new Date(item.isoDate) : new Date(item.pubDate)
            }));

            allNews = [...allNews, ...items];
            console.log(`✅ Found ${items.length} articles from ${feed.name}`);

        } catch (error) {
            console.error(`❌ Error fetching ${feed.name}:`, error.message);
        }
    }

    // Sort by date (newest first)
    allNews.sort((a, b) => b.isoDate - a.isoDate);

    // Filter out duplicates (based on title similarity or link)
    const uniqueNews = [];
    const seenTitles = new Set();

    for (const item of allNews) {
        const simplifiedTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!seenTitles.has(simplifiedTitle)) {
            seenTitles.add(simplifiedTitle);
            uniqueNews.push(item);
        }
    }

    // Prepare JSON
    const output = {
        updatedAt: new Date().toISOString(),
        totalArticles: uniqueNews.length,
        articles: uniqueNews
    };

    fs.writeFileSync('news.json', JSON.stringify(output, null, 2));
    console.log(`🎉 Success! Saved ${uniqueNews.length} articles to news.json`);
}

fetchNews();
