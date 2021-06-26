import React from 'react';
import ReactDOM from 'react-dom';
import App from './../App';
import {Currency} from './../components/CurrencyItem';
import { act } from 'react-dom/test-utils';
import { cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axiosMock from "axios";

configure({ adapter: new Adapter() });
const API_ERROR_MESSAGE = 'An error has occured with the api, please try again';
afterEach(cleanup);
const rates = [{BRL:1, EUR: 2}]

it("has fetched data from the api", async () =>{
  const container = document.createElement('div');
  axiosMock.get.mockImplementationOnce(()=> Promise.resolve({
    data:{
      rates: rates
    }
  }));
  await act(async() => ReactDOM.render(<App />, container));
  expect(axiosMock.get).toHaveBeenCalled();
  expect(axiosMock.get).toHaveBeenCalledWith("/currencyRates");
});

it("has rejected data from the api", async () =>{
  axiosMock.get.mockImplementationOnce(()=> Promise.rejected({
    data:{
      rates: rates
    }
  }));
  const wrapper = mount(<App />);
  const apiErrorElement = wrapper.find('#apiError');
  expect(apiErrorElement.text()).toBe(API_ERROR_MESSAGE);
});

it("has converted currency", async () =>{
  const rates = [{BRL:1, EUR: 2}]
  axiosMock.get.mockImplementation(()=> Promise.resolve({
    data:{
      rates: rates,
    }
  }));
  await act( async ()=> {
    const wrapper = mount(<App />);
    const currency = wrapper.find(Currency); 
    const convertButton = currency.find('#convertButton');
    await convertButton.simulate('click');
    const researchList = wrapper.find('#previousReseaches');
    expect(researchList.find('li')).toBeTruthy();
  });

  });