const axios = require('axios');

// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'pXoibU9uDKjwERfiN1XH2mQinedjX4NtuBvtZgii';
const API_ENDPOINT = 'https://api.sec-api.io/insider-trading';

async function fetchInsiderTradingData(query) {
    try {
        const response = await axios.post(`${API_ENDPOINT}?token=${API_KEY}`, query, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Assuming the API returns XML data, you can parse it to JSON here.
        // You may need to use a library like xml2js to parse the XML response.

        // For demonstration purposes, let's assume the API response is already in JSON format.
        const jsonData = response.data;

        return jsonData;
    } catch (error) {
        throw new Error(`Error fetching Insider Trading Data: ${error.message}`);
    }
}

module.exports = {
    fetchInsiderTradingData,
};
