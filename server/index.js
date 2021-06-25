const path = require('path');
const express = require("express");
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const APP_ID = 'c48d9272f54091272549db54a5bc6051';
const CURRENCY_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key='+APP_ID;

app.use(express.static(path.resolve(__dirname, '../build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/currencyRates', async (req, res) => {
  try {
    const data = await fetch(CURRENCY_URL)
      .then(res => res.json())
    res.send(data)
  } catch (error) {
    console.log('error:', error);
  }
})

app.get('/convert', async (req, res) => {
  try {
    const to = req.get('to');
    const from = req.get('to');
    const convertURL = `http://api.exchangeratesapi.io/v1/latest?from=${from}&to=${to}&access_key=${APP_ID}`;
    const data = await fetch(convertURL)
      .then(res => res.json())
    res.send(data)
  } catch (error) {
    console.log('error:', error);
  }
})


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

