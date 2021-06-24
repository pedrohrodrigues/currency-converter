import React,{ useEffect,useState } from 'react';
import './App.css';
import { Currency } from './components/CurrencyItem';

const APP_ID = 'c48d9272f54091272549db54a5bc6051';
const CURRENCY_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key='+APP_ID;




function App() {
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [apiError, setApiError] = useState();
  const [amount, setAmount] = useState()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [conversion, setConversion] = useState()
  const [conversionsHistory, setConversionHistory] = useState([])

  useEffect(() => {
    try {
    fetch(CURRENCY_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyTypes([...Object.keys(data.rates)])
      })
    } catch(error) {
      setApiError('An error has occured with the api, please try again');
    }
  }, [])
  
  async function convert() {
    const convertURL = `http://api.exchangeratesapi.io/v1/latest?base=${from}&symbols=${to}&access_key=${APP_ID}`;
    try{
      const data = await fetch(convertURL, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : 'http://localhost:8000',
        },
        method: "GET",
        dataType: "jsonp",
      }).then(response => response.json()).then(json => json.rates);
      const conversion = (amount * data[to]).toFixed(2);
      const currentResearch = conversionsHistory;
      if(conversionsHistory.length > 10) {
        currentResearch.shift();
      }
      currentResearch.push(`${amount} ${from} is equal to ${conversion} ${to}`);
      setConversionHistory(currentResearch)
      setConversion(conversion + ' ' + to);
    } catch(error) {
      setApiError('An error has occured with the api, please try again');
    }
  }

  function handleChangeAmount(e) {
    setAmount(e.target.value)
  }

  function handleChangeTo(e) {
    setTo(e.target.value)
  }

  
  function handleChangeFrom(e) {
    setFrom(e.target.value)
  }

  return (
    <div className="App">
      <Currency 
        currencyTypes={currencyTypes} onChangeAmount={handleChangeAmount} onClickButton={convert} 
        conversion={conversion}
        history={conversionsHistory}
        onChangeTo={handleChangeTo}
        onChangeFrom={handleChangeFrom}
      />
      {apiError}
    </div>
  );
}

export default App;
