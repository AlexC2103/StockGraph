import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function LineChart ({symbol}) {

  const [chartPriceValues, setChartPriceValues] = useState([]);
  const [chartDateValues, setChartDateValues] = useState([]);

  useEffect(() => {
    const fetchStock = () => {

    var API_KEY = '3911619KY5PDLH26';
    var API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;

    var chartDateValuesCopy = [];
    var chartPriceValuesCopy = [];

    fetch(API_URL)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          for (var key in data['Time Series (Daily)']) {
            chartDateValuesCopy.push(key);
            chartPriceValuesCopy.push(data['Time Series (Daily)'][key]['1. open']);
          }
          setChartDateValues(chartDateValuesCopy.reverse());
          setChartPriceValues(chartPriceValuesCopy.reverse());
        }
      )

    };
    fetchStock();
  }, [symbol]);

  return (

    <div>
      <Line
        data={{
          labels: chartDateValues,
          datasets:[{
            label: 'Stock Pricing',
            data: chartPriceValues,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }],
        }}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
}

export default LineChart;
