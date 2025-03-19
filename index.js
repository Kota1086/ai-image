const response = await fetch(`YOUR_API_ENDPOINT?q=${encodeURIComponent(query)}`);
const filteredSongs = await response.json();