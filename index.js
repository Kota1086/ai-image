async function searchSong() {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';

    try {
        // Replace this URL with your actual search API endpoint
        const apiUrl = `https://dark-shan-yt.koyeb.app/search?q=${encodeURIComponent(searchInput.value)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.status || !data.data) {
            throw new Error('No results found');
        }

        resultsDiv.innerHTML = `
            <div class="result-card">
                <h2>${data.data.title}</h2>
                <img src="${data.data.thumbnail}" class="thumbnail" alt="Album art">
                <br><br>
                <a href="${data.data.link}" download>
                    <button>Download</button>
                </a>
            </div>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red">Error: ${error.message}</p>`;
    }
}