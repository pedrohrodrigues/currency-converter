import React from 'react';
import ReactDOM from 'react-dom';
import { Currency } from './../CurrencyItem';
import { cleanup } from "@testing-library/react";

const currencyTypes = ['EUR','USD','BRL'];
const history = [];

afterEach(cleanup);

it("renders correctly", () =>{
  const div = document.createElement('div');
  ReactDOM.render(<Currency currencyTypes={currencyTypes} history={history}/>, div);
});
