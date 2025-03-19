async function search() {
    const searchInput = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch('https://spotifyuserapiserg-osipchukv1.p.rapidapi.com/checkFollowArtist', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '11619ccb1bmsh0de30012429e6fbp1d860bjsn660d31dc232c',
                'x-rapidapi-host': 'SpotifyUserAPIserg-osipchukV1.p.rapidapi.com',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // Add proper body parameters if required by the API
            // body: new URLSearchParams({ artistId: '', userId: '' })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
        
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

// Note: This will currently return authorization-related errors because:
// 1. The endpoint is for checking artist follows, not searching songs
// 2. Required parameters are missing
// 3. Client-side API key exposure is insecure