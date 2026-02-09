document.addEventListener('DOMContentLoaded', () => {
    const newsGrid = document.getElementById('newsGrid');
    const searchInput = document.getElementById('searchInput');
    const loading = document.getElementById('loading');

    let allArticles = [];

    // Function to format date beautifully
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

    // Function to render news cards
    const renderNews = (articles) => {
        newsGrid.innerHTML = '';

        if (articles.length === 0) {
            newsGrid.innerHTML = '<div class="loading">No articles match your search.</div>';
            return;
        }

        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'news-card';

            // Clean up snippet (remove HTML tags if any, limit length)
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

    // Main fetch function
    const fetchNews = async () => {
        try {
            const response = await fetch('news.json');
            if (!response.ok) throw new Error('Failed to load news database');

            const data = await response.json();
            allArticles = data.articles;

            // Initial render
            loading.style.display = 'none';
            renderNews(allArticles);

        } catch (error) {
            console.error(error);
            loading.innerHTML = '⚠️ System Error: Unable to retrieve intelligence packets. Check connection.';
        }
    };

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allArticles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            (article.contentSnippet && article.contentSnippet.toLowerCase().includes(query))
        );
        renderNews(filtered);
    });

    // Start the engine
    fetchNews();
});
