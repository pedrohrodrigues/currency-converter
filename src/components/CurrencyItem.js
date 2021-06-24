import React from 'react';
import '../assets/CurrencyItem.css';
import PropTypes from 'prop-types';

const APP_ID = 'c48d9272f54091272549db54a5bc6051';
const CONVERT_URL = 'https://openexchangerates.org/api/convert/?app_id='+APP_ID;

export class Currency extends React.Component{

  render() {
  return (
    <div className="currency-container">
      <h1>Currency Converter</h1>
      <div className="currency-converter">
          <div className="currency-converter__item">
            <label htmlFor="amount">Amount</label>
            <input id="amount" type="number" onChange={this.props.onChangeAmount}/>
          </div>
          <div className="currency-converter__item">
            <label htmlFor="from">From</label>
            <select id="from" onChange={this.props.onChangeFrom}>
              {this.props.currencyTypes.map(option =>(
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="currency-converter__item">
            <label htmlFor="to">To</label>
            <select id="to" onChange={this.props.onChangeTo}>
              {this.props.currencyTypes.map(option =>(
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="currency-converter__item currency-converter__item--button">
            <button onClick={this.props.onClickButton}>
              Convert
            </button>
          </div>
          <div class="conversion_result">
            {this.props.conversion}
          </div>
      </div>
      <div>
        Previous Researchs      
          <ul>
            {this.props.history.map(h => (
              <li key={h}> {h} </li>
            ))}
          </ul>
      </div>
    </div>
  );
  }
}

Currency.propTypes = {
  currencyTypes: PropTypes.array.isRequired
}