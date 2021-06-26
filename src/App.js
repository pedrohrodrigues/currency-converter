import React,{ useEffect,useState } from 'react';
import './App.css';
import axios from 'axios';
import { Currency } from './components/CurrencyItem';

function App() {
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [apiError, setApiError] = useState();
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [conversion, setConversion] = useState()
  const [conversionsHistory, setConversionHistory] = useState([])

  useEffect(() => {
    const loadCurrencyTypes = async () => {
    try {
      setApiError('');
      const { data } = await axios.get('/currencyRates');
      setFrom(Object.keys(data.rates)[0]);
      setTo(Object.keys(data.rates)[0]);
      setCurrencyTypes([...Object.keys(data.rates)])
    } catch(error) {
      setApiError('An error has occured with the api, please try again');
  }
}
loadCurrencyTypes();
}, []);
  
  async function convert() {
    setApiError('');
    try{
      const { data } = await axios.get('/convert', {
        headers: {
          from: from,
          to: to,
        } 
      });
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
        amount={amount}
        conversion={conversion}
        onChangeTo={handleChangeTo}
        onChangeFrom={handleChangeFrom}
      />
      <div data-testid="apiError" class="api-error" id="apiError">{apiError}</div>
      <div class="previous-researches">
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
