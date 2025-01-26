// Search functionality for the blog site
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (!searchTerm) return;

        try {
            // Get the current path and calculate the correct path to blogs.json
            const currentPath = window.location.pathname;
            const isInPages = currentPath.includes('/pages/');
            const blogsJsonPath = isInPages ? '../data/blogs.json' : './data/blogs.json';

            const response = await fetch(blogsJsonPath);
            if (!response.ok) {
                throw new Error('Blogs verisi yüklenemedi');
            }

            const data = await response.json();

            const searchResults = data.blogs.filter(blog => {
                return (
                    blog.title.toLowerCase().includes(searchTerm) ||
                    blog.summary.toLowerCase().includes(searchTerm) ||
                    blog.category.toLowerCase().includes(searchTerm) ||
                    blog.author.toLowerCase().includes(searchTerm)
                );
            });

            // Redirect to search results page with the results
            const searchParams = new URLSearchParams();
            searchParams.set('q', searchTerm);
            searchParams.set('results', JSON.stringify(searchResults));

            // Use the correct path for search-results.html
            const searchResultsPath = isInPages ? './search-results.html' : './pages/search-results.html';
            window.location.href = `${searchResultsPath}?${searchParams.toString()}`;
        } catch (error) {
            console.error('Error searching blogs:', error);
            alert('Arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    });
});