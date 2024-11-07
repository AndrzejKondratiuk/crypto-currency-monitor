const exchangeRateApiKey = '67a0aaf6f1e3ae74d7f6370b';

// Fetch and display currency rates in a table format
async function fetchCurrencyRates() {
    const currencyRates = document.getElementById('currency-rates');
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`);
        const data = await response.json();
        
        currencyRates.innerHTML = '';
        Object.entries(data.conversion_rates).forEach(([currency, rate]) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${currency}</td><td>${rate.toFixed(4)}</td>`;
            currencyRates.appendChild(row);
        });
    } catch (error) {
        currencyRates.innerHTML = '<tr><td colspan="2">Error fetching currency rates.</td></tr>';
    }
}

// Fetch and display crypto rates in a table format
async function fetchCryptoRates() {
    const cryptoRates = document.getElementById('crypto-rates');
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd');
        const data = await response.json();
        
        cryptoRates.innerHTML = '';
        Object.entries(data).forEach(([crypto, info]) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${crypto.toUpperCase()}</td><td>$${info.usd}</td>`;
            cryptoRates.appendChild(row);
        });
    } catch (error) {
        cryptoRates.innerHTML = '<tr><td colspan="2">Error fetching crypto rates.</td></tr>';
    }
}

// Initialize selectors and refresh every 3 seconds
function init() {
    fetchCurrencyRates();
    fetchCryptoRates();
    setInterval(fetchCurrencyRates, 3000); // Refresh currency rates every 3 seconds
    setInterval(fetchCryptoRates, 3000);   // Refresh crypto rates every 3 seconds
}

document.addEventListener('DOMContentLoaded', init);
