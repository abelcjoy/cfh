// Global functions to ensure they are available for onclick events

// Function to format date
const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    if (diffHours < 24) {
        return `${diffHours} hours ago`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Share functionality
window.shareNews = (title, url) => {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(`${title}\n${url}`);
        alert('Link copied to clipboard! Ready to send to your friend.');
    }
};

// Dataset rendering
const renderDatasets = (datasets) => {
    const datasetGrid = document.getElementById('datasetGrid');
    if (!datasetGrid) return;

    datasetGrid.innerHTML = '';

    if (datasets.length === 0) {
        datasetGrid.innerHTML = '<div class="loading">No datasets found.</div>';
        return;
    }

    datasets.forEach(dataset => {
        const card = document.createElement('div');
        card.className = 'news-card';

        const cleanSnippet = dataset.description || 'No description available.';

        card.innerHTML = `
            <div>
              <div class="news-meta">
                <span class="news-source" style="color: #60a5fa;">${dataset.source}</span>
                <span>Updated: ${dataset.updated}</span>
              </div>
              <div class="news-title">${dataset.title}</div>
              <div class="news-snippet">${cleanSnippet}</div>
              <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem;">
                🖼️ Images: <b>${dataset.images}</b>
              </div>
            </div>
            <div class="card-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
                <a href="${dataset.url}" target="_blank" class="read-more" style="flex: 1; background: #60a5fa; color: #0f172a;">Download Dataset 💾</a>
            </div>
        `;

        datasetGrid.appendChild(card);
    });
};

// Fetch Datasets
const fetchDatasets = async () => {
    const datasetGrid = document.getElementById('datasetGrid');
    try {
        const response = await fetch('datasets.json');
        if (!response.ok) throw new Error('Failed to load datasets');

        const data = await response.json();
        renderDatasets(data.datasets);

    } catch (error) {
        console.error(error);
        if (datasetGrid) {
            datasetGrid.innerHTML = '<div class="loading">⚠️ Error loading dataset vault.</div>';
        }
    }
};

// Render Risk cards
const renderRisks = (risks) => {
    const riskGrid = document.getElementById('riskGrid');
    if (!riskGrid) return;

    riskGrid.innerHTML = '';

    if (risks.length === 0) {
        riskGrid.innerHTML = '<div class="loading">No active risks detected.</div>';
        return;
    }

    risks.forEach(risk => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.borderColor = '#ef4444'; // Red border for danger

        const cleanSnippet = risk.snippet
            ? risk.snippet.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : 'Click to investigate incident...';

        card.innerHTML = `
            <div>
              <div class="news-meta">
                <span class="news-source" style="color: #ef4444;">⚠️ ${risk.source}</span>
                <span>${formatTime(risk.isoDate)}</span>
              </div>
              <div class="news-title">${risk.title}</div>
              <div class="news-snippet">${cleanSnippet}</div>
            </div>
            <div class="card-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
                <a href="${risk.link}" target="_blank" class="read-more" style="flex: 1; background: #ef4444; color: #fff;">Analyze Risk 🚨</a>
            </div>
        `;

        riskGrid.appendChild(card);
    });
};

// Fetch Risks
const fetchRisks = async () => {
    const riskGrid = document.getElementById('riskGrid');
    try {
        const response = await fetch('risks.json');
        if (!response.ok) throw new Error('Failed to load risk database');

        const data = await response.json();
        renderRisks(data.articles);

    } catch (error) {
        console.error(error);
        if (riskGrid) {
            riskGrid.innerHTML = '<div class="loading">⚠️ Error loading risk radar.</div>';
        }
    }
};

// Tab Switching
window.switchTab = (tabName) => {
    console.log('Switching to tab:', tabName);
    const newsGrid = document.getElementById('newsGrid');
    const datasetGrid = document.getElementById('datasetGrid');
    const riskGrid = document.getElementById('riskGrid');
    const tabNews = document.getElementById('tab-news');
    const tabDatasets = document.getElementById('tab-datasets');
    const tabRisks = document.getElementById('tab-risks');

    // Hide all
    if (newsGrid) newsGrid.style.display = 'none';
    if (datasetGrid) datasetGrid.style.display = 'none';
    if (riskGrid) riskGrid.style.display = 'none';

    // Reset buttons
    if (tabNews) {
        tabNews.style.background = 'transparent';
        tabNews.style.color = 'var(--text-secondary)';
        tabNews.style.border = '1px solid var(--border-color)';
    }
    if (tabDatasets) {
        tabDatasets.style.background = 'transparent';
        tabDatasets.style.color = 'var(--text-secondary)';
        tabDatasets.style.border = '1px solid var(--border-color)';
    }
    if (tabRisks) {
        tabRisks.style.background = 'transparent';
        tabRisks.style.color = 'var(--text-secondary)';
        tabRisks.style.border = '1px solid var(--border-color)';
    }

    if (tabName === 'news') {
        newsGrid.style.display = 'grid';
        tabNews.style.background = 'var(--accent)';
        tabNews.style.color = 'var(--bg-primary)';
        tabNews.style.border = 'none';
    } else if (tabName === 'datasets') {
        datasetGrid.style.display = 'grid';
        tabDatasets.style.background = '#60a5fa';
        tabDatasets.style.color = '#0f172a';
        tabDatasets.style.border = 'none';

        if (datasetGrid.children.length === 0) fetchDatasets();
    } else if (tabName === 'risks') {
        riskGrid.style.display = 'grid';
        tabRisks.style.background = '#ef4444';
        tabRisks.style.color = '#fff';
        tabRisks.style.border = 'none';

        if (riskGrid.children.length === 0) fetchRisks();
    }
};

// Initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const newsGrid = document.getElementById('newsGrid');
    const searchInput = document.getElementById('searchInput');
    const loading = document.getElementById('loading');

    let allArticles = [];

    const renderNews = (articles) => {
        newsGrid.innerHTML = '';

        if (articles.length === 0) {
            newsGrid.innerHTML = '<div class="loading">No articles match your search.</div>';
            return;
        }

        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'news-card';

            const cleanSnippet = article.contentSnippet
                ? article.contentSnippet.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                : 'Click to read more of this story...';

            card.innerHTML = `
                <div>
                  <div class="news-meta">
                    <span class="news-source">${article.source}</span>
                    <span>${formatTime(article.isoDate)}</span>
                  </div>
                  <div class="news-title">${article.title}</div>
                  <div class="news-snippet">${cleanSnippet}</div>
                </div>
                <div class="card-actions" style="display: flex; gap: 0.5rem; margin-top: auto;">
                    <a href="${article.link}" target="_blank" class="read-more" style="flex: 1;">Read Full Analysis ↗</a>
                    <button onclick="shareNews('${article.title.replace(/'/g, "\\'")}', '${article.link}')" class="read-more" style="background: var(--bg-secondary); border: 1px solid var(--accent); cursor: pointer;">Share 📤</button>
                </div>
            `;

            newsGrid.appendChild(card);
        });
    };

    const fetchNews = async () => {
        try {
            const response = await fetch('news.json');
            if (!response.ok) throw new Error('Failed to load news database');

            const data = await response.json();
            allArticles = data.articles;

            loading.style.display = 'none';
            renderNews(allArticles);

        } catch (error) {
            console.error(error);
            loading.innerHTML = '⚠️ System Error: Unable to retrieve intelligence packets. Check connection.';
        }
    };

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allArticles.filter(article =>
                article.title.toLowerCase().includes(query) ||
                (article.contentSnippet && article.contentSnippet.toLowerCase().includes(query))
            );
            renderNews(filtered);
        });
    }

    // Start news engine
    fetchNews();
});
