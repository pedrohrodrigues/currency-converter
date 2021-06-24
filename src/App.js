import React,{ useEffect,useState } from 'react';
import './App.css';
import { Currency } from './components/CurrencyItem';

const APP_ID = 'c48d9272f54091272549db54a5bc6051';
const CURRENCY_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key='+APP_ID;



function App() {
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [apiError, setApiError] = useState();

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

  
  return (
    <div className="App">
      <Currency currencyTypes={currencyTypes}  />
      {apiError}
    </div>
  );
}

export default App;
