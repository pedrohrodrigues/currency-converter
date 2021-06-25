import React,{ useEffect,useState } from 'react';
import './App.css';
import axios from 'axios';
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
    const loadCurrencyTypes = async () => {
    try {
      const { data } = await axios.get(CURRENCY_URL);
      setCurrencyTypes([...Object.keys(data.rates)])
    } catch(error) {
      setApiError('An error has occured with the api, please try again');
  }
}
loadCurrencyTypes();
}, []);
  
  async function convert() {
    const convertURL = `http://api.exchangeratesapi.io/v1/latest?base=${from}&symbols=${to}&access_key=${APP_ID}`;
    try{
      const { data } = await axios.get(convertURL);
      const conversion = (amount * data.rates[to]).toFixed(2);
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
        onChangeTo={handleChangeTo}
        onChangeFrom={handleChangeFrom}
      />
      <div data-testid="apiError" id="apiError">{apiError}</div>
      <div>
        Previous Researches      
          <ul id="previousReseaches">
            {conversionsHistory.map(h => (
              <li key={h}> {h} </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;
