const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();

// Highly specific R&D / Hardware queries
const HARDWARE_FEEDS = [
    {
        name: 'Delta Robot Research',
        url: 'https://news.google.com/rss/search?q=(delta+robot+OR+parallel+manipulator+OR+picker+robot)+when:30d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'Robotic Grippers & End-Effectors',
        url: 'https://news.google.com/rss/search?q=(robotic+gripper+OR+soft+robotics+OR+end+effector+OR+suction+cup+robot)+when:30d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'Industrial Automation (Sorting)',
        url: 'https://news.google.com/rss/search?q=(high+speed+pick+and+place+OR+waste+sorting+robot+OR+robotic+arm+mechanism)+when:30d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        name: 'IEEE Robotics (Hardware)',
        url: 'https://spectrum.ieee.org/feeds/topic/robotics'
    }
];

async function fetchHardware() {
    console.log('🦾 R&D Protocol Initiated... Scanning for Hardware Innovations...');
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
    console.log(`🔩 Blueprint Acquired! Saved ${uniqueHardware.length} R&D items to hardware.json`);
}

fetchHardware();
