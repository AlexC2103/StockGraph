import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';

function StockNameInput({onChange}) {

  const [company, setCompany] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  function handleChange(event) {
    setCompany(event.target.value);
  }

  function returnSymbol(event) {

    var key = '3911619KY5PDLH26';
    var URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${key}`;

    var returnedSuggestions = [];

    fetch(URL)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          for (var key in data['bestMatches']) {
            returnedSuggestions.push(data['bestMatches'][key]['1. symbol']);
            returnedSuggestions[key] += '   ';
            returnedSuggestions[key] += data['bestMatches'][key]['2. name'];
          }
          setSuggestions(returnedSuggestions);
        }
      )
    event.preventDefault();
  }

  function suggestionSelected(value) {
    const wordsArray = value.split(' ');
    setCompany(wordsArray[0]);
    setSuggestions([]);
    onChange(wordsArray[0]);
  }

  return (
    <div>
      <form onSubmit={returnSymbol}>
        <label>
          Search for companies:
          <br></br>
          <input type="text" value={company} onChange={handleChange}/>
          <input type="submit" value="Submit" />
          <ul>
            {suggestions.map((item) => <li onClick={() => suggestionSelected(item)}>{item}</li>)}
          </ul>
        </label>
      </form>
    </div>
  );
}

export default StockNameInput;
