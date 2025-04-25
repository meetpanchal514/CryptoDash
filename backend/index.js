const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for frontend access
app.use(cors({
  origin: ['http://frontend:3000', 'http://localhost:3000'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
}));

// Helper function to simulate historical prices based on percent_change_7d
const simulateHistoricalPrices = (currentPrice, percentChange7d) => {
  const historicalPrices = [];
  const today = new Date();
  
  // Calculate the price 7 days ago based on the percent change
  const price7DaysAgo = currentPrice / (1 + percentChange7d / 100);
  
  // Calculate the daily price change (linear approximation)
  const dailyPriceChange = (currentPrice - price7DaysAgo) / 6; // 6 intervals between 7 days
  
  // Generate prices for the past 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const price = price7DaysAgo + dailyPriceChange * i;
    historicalPrices.push({
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      price: parseFloat(price.toFixed(2)),
    });
  }
  
  return historicalPrices;
};

// Endpoint to fetch current coin data and simulate historical data
app.get('/coins', async (req, res) => {
  try {
    console.log('📡 Fetching ticker data from CoinLore...');
    const tickerResponse = await axios.get('https://api.coinlore.net/api/tickers/', {
      params: { limit: 100 },
      timeout: 10000,
    });

    // Check if response contains valid data
    if (!tickerResponse.data || !Array.isArray(tickerResponse.data.data)) {
      throw new Error('Invalid response from CoinLore');
    }

    console.log(`📊 Fetched ${tickerResponse.data.data.length} coins`);

    // Map the data to the required format and simulate historical prices
    const coins = tickerResponse.data.data
      .map(coin => {
        if (!coin.id) {
          console.warn(`⚠️ Skipping coin with missing id: ${JSON.stringify(coin)}`);
          return null;
        }

        // Simulate historical prices using percent_change_7d
        const historicalPrices = simulateHistoricalPrices(
          parseFloat(coin.price_usd) || 0,
          parseFloat(coin.percent_change_7d) || 0
        );

        return {
          id: coin.id,
          name: coin.name || 'Unknown',
          current_price: parseFloat(coin.price_usd) || 0,
          market_cap: parseFloat(coin.market_cap_usd) || 0,
          historical_prices: historicalPrices,
        };
      })
      .filter(coin => coin !== null);
      // Removed .slice(0, 9) to allow more coins for pagination

    console.log('✅ Successfully fetched current coin data and simulated historical prices');
    res.json({ coins });
  } catch (err) {
    console.error('❌ Failed to fetch data:', {
      message: err.message,
      code: err.code,
      response: err.response ? err.response.data : null,
    });
    res.status(500).json({
      error: 'Failed to fetch data',
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://0.0.0.0:${PORT}`));