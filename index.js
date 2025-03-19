// index.js
const API_BASE_URL = 'https://your-backend-api.com'; // Replace with your actual API URL

async function searchSong() {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a song name or YouTube URL!');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            resultsDiv.innerHTML = '<p>No results found!</p>';
            return;
        }

        resultsDiv.innerHTML = data.results.map((video, index) => `
            <div class="result">
                <h3>${video.title}</h3>
                <img class="thumbnail" src="${video.image}" alt="Thumbnail">
                <p>Duration: ${video.timestamp} | Views: ${video.views}</p>
                <div class="download-options">
                    <button class="download-btn" onclick="downloadSong('${video.videoId}', 'audio')">
                        Audio 🎵
                    </button>
                    <button class="download-btn" onclick="downloadSong('${video.videoId}', 'document')">
                        Document 📁
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = '<p>Error fetching results!</p>';
    }
}

async function downloadSong(videoId, type) {
    try {
        const response = await fetch(`${API_BASE_URL}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoId,
                type
            })
        });

        const data = await response.json();

        if (data.downloadUrl) {
            // Trigger download
            const link = document.createElement('a');
            link.href = data.downloadUrl;
            link.download = true;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Download failed!');
        }
    } catch (error) {
        console.error(error);
        alert('Download error!');
    }
}