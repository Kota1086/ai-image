const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { decideTrade } = require('./utils/strategy');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/signal', async (req, res) => {
    try {
        const response = await fetch('https://api.unirateapi.com/api/rates?api_key=3qnkZTTviZbpc1XECRocSnu3xDOmC7WhFY7vaAzuWjG61ygMWIvroLBPKB4MGszt&from=USD');
        const data = await response.json();
        const eurRate = data.rates.EUR;

        if (!eurRate) {
            throw new Error('EUR Rate not found.');
        }

        const decision = decideTrade(eurRate);
        res.json({ decision });
    } catch (error) {
        console.error(error);
        res.status(500).json({ decision: 'ERROR', message: 'Failed to fetch signal.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});