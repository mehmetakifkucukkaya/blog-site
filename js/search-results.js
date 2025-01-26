document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    let searchResults = [];

    try {
        searchResults = JSON.parse(urlParams.get('results') || '[]');
    } catch (error) {
        console.error('Error parsing search results:', error);
        searchResults = [];
    }

    const searchInfo = document.getElementById('search-info');
    const resultsContainer = document.getElementById('results-container');

    if (!searchQuery) {
        searchInfo.textContent = 'Geçersiz arama sorgusu';
        resultsContainer.innerHTML = '<p class="no-results">Lütfen geçerli bir arama terimi girin.</p>';
        return;
    }

    // Update search info
    searchInfo.textContent = `"${searchQuery}" için ${searchResults.length} sonuç bulundu`;

    // Display results
    if (searchResults.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">Aramanızla eşleşen blog bulunamadı.</p>';
    } else {
        resultsContainer.innerHTML = searchResults.map(blog => `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}" onerror="this.src='../images/placeholder.jpg'">
                </div>
                <div class="blog-content">
                    <h2 class="blog-title">${blog.title}</h2>
                    <p class="blog-meta">
                        <span class="blog-category">${blog.category}</span>
                        <span class="blog-author">${blog.author}</span>
                        <span class="blog-date">${blog.date}</span>
                    </p>
                    <p class="blog-summary">${blog.summary}</p>
                    <a href="blog-detail.html?id=${blog.id}" class="read-more">Devamını Oku</a>
                </div>
            </article>
        `).join('');
    }
}); 