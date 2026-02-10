const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();

// Highly specific "Red Flag" queries
const RISK_FEEDS = [
    {
        name: 'Legal Actions & Fines',
        url: 'https://news.google.com/rss/search?q=waste+management+company+(lawsuit+OR+fine+OR+violation+OR+penalty)+when:30d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'Fires & Accidents',
        url: 'https://news.google.com/rss/search?q=(landfill+fire+OR+recycling+plant+fire+OR+waste+facility+accident)+when:30d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'Business Failures',
        url: 'https://news.google.com/rss/search?q=waste+management+(bankruptcy+OR+closure+OR+shut+down+OR+liquidated)+when:30d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'Regulatory Crackdowns',
        url: 'https://news.google.com/rss/search?q=waste+permit+revoked+OR+illegal+dumping+charges+when:30d&hl=en-US&gl=US&ceid=US:en'
    }
];

async function fetchRisks() {
    console.log('⚠️ Risk Radar Activated... Scanning for failures...');
    let allRisks = [];

    for (const feed of RISK_FEEDS) {
        try {
            console.log(`Scanning: ${feed.name}`);
            const result = await parser.parseURL(feed.url);

            const risks = result.items.map(item => ({
                title: item.title,
                link: item.link,
                date: item.pubDate,
                snippet: item.contentSnippet || item.content || '',
                source: feed.name, // Categorized by risk type
                isoDate: new Date(item.pubDate).toISOString()
            }));

            allRisks = [...allRisks, ...risks];
        } catch (error) {
            console.error(`❌ Error scanning ${feed.name}:`, error.message);
        }
    }

    // De-duplicate URLs
    const uniqueRisks = Array.from(new Set(allRisks.map(a => a.link)))
        .map(link => allRisks.find(a => a.link === link));

    // Sort by newest
    uniqueRisks.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Prepare outcome
    const output = {
        updatedAt: new Date().toISOString(),
        total: uniqueRisks.length,
        articles: uniqueRisks
    };

    fs.writeFileSync('risks.json', JSON.stringify(output, null, 2));
    console.log(`🚨 Danger Logged! Saved ${uniqueRisks.length} risk alerts to risks.json`);
}

fetchRisks();
