async function searchSong() {
    const searchInput = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (!searchInput) {
        alert('Please enter a song name');
        return;
    }

    try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`https://your-api-endpoint.com/search?q=${encodeURIComponent(searchInput)}`);
        const data = await response.json();

        if (!data.status) {
            resultsDiv.innerHTML = '<p>No results found</p>';
            return;
        }

        const song = data.data;
        resultsDiv.innerHTML = `
            <div class="song-card">
                <img src="${song.thumb}" class="song-thumb" alt="${song.name}">
                <div class="song-info">
                    <h2>${song.name}</h2>
                    <p><strong>Artist:</strong> ${song.artist}</p>
                    <p><strong>Album:</strong> ${song.albumname}</p>
                    <p><strong>Duration:</strong> ${song.duration}</p>
                    <a href="${song.download}" class="download-btn" download>Download Song</a>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<p>Error fetching results. Please try again later.</p>';
    }
}