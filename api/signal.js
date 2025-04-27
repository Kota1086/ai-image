// api/signal.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.unirateapi.com/api/rates?api_key=3qnkZTTviZbpc1XECRocSnu3xDOmC7WhFY7vaAzuWjG61ygMWIvroLBPKB4MGszt&from=USD');
    const data = await response.json();

    // Simple strategy එකක් (example)
    const eurusdRate = data.rates?.EUR;

    let signal = 'WAIT';
    if (eurusdRate > 1.08) {
      signal = 'SELL';
    } else if (eurusdRate < 1.07) {
      signal = 'BUY';
    }

    res.status(200).json({ signal, rate: eurusdRate });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch signal' });
  }
}