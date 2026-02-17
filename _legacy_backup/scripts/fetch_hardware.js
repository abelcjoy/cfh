const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();

// The "Zero Tolerance" Feed: ONLY "Delta Robot"
// No synonyms. No approximate matches.
const HARDWARE_FEEDS = [
    {
        name: 'Delta Robot Research (Google)',
        url: 'https://news.google.com/rss/search?q="delta+robot"+when:30d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'YouTube - Delta Robot Demos',
        url: 'https://news.google.com/rss/search?q=site:youtube.com+"delta+robot"+when:30d&hl=en-US&gl=US&ceid=US:en'
    }
];

async function fetchHardware() {
    console.log('🦾 R&D Protocol: ZERO TOLERANCE scanning for "Delta Robot"...');
    let allHardware = [];

    for (const feed of HARDWARE_FEEDS) {
        try {
            console.log(`Scanning: ${feed.name}`);
            const result = await parser.parseURL(feed.url);

            const items = result.items.map(item => ({
                title: item.title,
                link: item.link,
                date: item.pubDate,
                snippet: item.contentSnippet || item.content || '',
                source: feed.name,
                isoDate: item.isoDate ? new Date(item.isoDate).toISOString() : new Date(item.pubDate).toISOString()
            }));

            allHardware = [...allHardware, ...items];
        } catch (error) {
            console.error(`❌ Error scanning ${feed.name}:`, error.message);
        }
    }

    // De-duplicate URLs
    const uniqueHardware = Array.from(new Set(allHardware.map(a => a.link)))
        .map(link => allHardware.find(a => a.link === link));

    // Sort by newest
    uniqueHardware.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Prepare outcome
    const output = {
        updatedAt: new Date().toISOString(),
        total: uniqueHardware.length,
        articles: uniqueHardware
    };

    fs.writeFileSync('hardware.json', JSON.stringify(output, null, 2));
    console.log(`🔩 Purity Achieved! Saved ${uniqueHardware.length} "Delta Robot" ONLY items.`);
}

fetchHardware();
