// controller.js
//alpha vantage api key: ZZH9VMBKZJCN29SK
const express = require('express');
const axios = require('axios');
const router = express.Router();
const insiderTradingService = require('./insiderTradingService'); // Import the service file
const awsController = require('./awscontroller');
const e = require('express');
const { queryApi } = require('sec-api');
const https = require('https');

queryApi.setApiKey(process.env.SEC_API_KEY);

router.get('/api', async (req, res) => {
    try {
        const response = await awsController.initializeAws();
        res.send(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/search/:symbol', async (req, res) => {
    try {
        var apiKey= process.env.ALPHA_VANTAGE_API_KEY;
        const symbol = req.params.symbol;

        var apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;;

        // Make an HTTP GET request to Alpha Vantage
        const response = await axios.get(apiUrl, {
            headers: {
              'User-Agent': 'request'
            }
        });

        const timeSeries = response.data["Time Series (Daily)"];
        const metaData = response.data["Meta Data"];
        const dataArray = [];
        
        for (const date in timeSeries) {
          if (timeSeries.hasOwnProperty(date)) {
            const dailyData = timeSeries[date];
            dataArray.push({
              name: date,
              price: parseFloat(dailyData["4. close"]),
            });
          }
        }

        //get insider trades
        const query = {
            query: { query_string: { query: 'issuer.tradingSymbol:TSLA' } }, // get most recent 10-Q filings
            from: '0', // start with first filing. used for pagination.
            size: '10', // limit response to 10 filings
            sort: [{ filedAt: { order: 'desc' } }], // sort result by filedAt
          };

          const filings = await queryApi.getFilings(query);

          //get senate trades:

        var trades = [];
        const all_ticker_transactions = await axios.get("https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_ticker_transactions.json");
        for (let i = 0; i < all_ticker_transactions.data.length; i++ ) {
            var x = all_ticker_transactions.data[i];
            if (x && x.ticker === symbol.toUpperCase()) {
                for (let j = 0; j < x.transactions.length; j++ ){
                    let y = x.transactions[j]
                    let obj = {
                        amount: y.amount,
                        party: y.party,
                        sector: y.sector,
                        senator: y.senator,
                        state: y.state,
                        date: y.transaction_date,
                        type: y.type,
                    }
                    trades.push(obj);
                }
            }
        }
        var dto = {tickerTransactions: trades, insiderTransactions: filings, dataArray: dataArray, metaData: metaData};

        res.json(dto);

        // Extract and send the relevant data from the response

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
