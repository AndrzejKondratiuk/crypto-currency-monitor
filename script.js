const exchangeRateApiKey = '67a0aaf6f1e3ae74d7f6370b';

// Fetch currency data from ExchangeRate API
async function fetchCurrencyRates() {
    const currencySelector = document.getElementById('currency-selector');
    const currencyRates = document.getElementById('currency-rates');
    
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`);
        const data = await response.json();
        
        currencyRates.innerHTML = '';
        Object.entries(data.conversion_rates).forEach(([currency, rate]) => {
            const rateItem = document.createElement('div');
            rateItem.textContent = `${currency}: ${rate}`;
            currencyRates.appendChild(rateItem);
        });
    } catch (error) {
        currencyRates.innerHTML = 'Error fetching currency rates.';
    }
}

// Fetch crypto data from CoinGecko API
async function fetchCryptoRates() {
    const cryptoRates = document.getElementById('crypto-rates');
    
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd');
        const data = await response.json();
        
        cryptoRates.innerHTML = '';
        Object.entries(data).forEach(([crypto, info]) => {
            const rateItem = document.createElement('div');
            rateItem.textContent = `${crypto.toUpperCase()}: $${info.usd}`;
            cryptoRates.appendChild(rateItem);
        });
    } catch (error) {
        cryptoRates.innerHTML = 'Error fetching crypto rates.';
    }
}

// Initialize selectors
function init() {
    fetchCurrencyRates();
    fetchCryptoRates();
}

document.addEventListener('DOMContentLoaded', init);
