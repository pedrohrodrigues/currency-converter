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

afterEach(cleanup);

it("has fetched data from the api", async () =>{
  const container = document.createElement('div');
  axiosMock.get.mockImplementationOnce(()=> Promise.resolve({
    data:{
      rates: {BRL:1}
    }
  }));
  await act(async() => ReactDOM.render(<App />, container));
  expect(axiosMock.get).toHaveBeenCalled();
  expect(axiosMock.get).toHaveBeenCalledWith("http://api.exchangeratesapi.io/v1/latest?access_key=c48d9272f54091272549db54a5bc6051");
});

it("has rejected data from the api", async () =>{
  axiosMock.get.mockImplementationOnce(()=> Promise.rejected({
    data:{
      rates: {BRL:1}
    }
  }));
  const wrapper = mount(<App />);
  const apiErrorElement = wrapper.find('#apiError');
  expect(apiErrorElement.text()).toBe('An error has occured with the api, please try again');
});

it("has converted currency", async () =>{
  const rates = [{BRL:1}]
  axiosMock.get.mockImplementation(()=> Promise.resolve({
    data:{
      rates: rates,
    }
  }));
  await act( async ()=> {
  const wrapper = mount(<App />);
  const currency = wrapper.find(Currency); 
  const convertButton = currency.find('#convertButton');
  convertButton.simulate('click');
  const researchList = wrapper.find('#previousReseaches');
  expect(researchList.length).toBeGreaterThan(0)
  });

});