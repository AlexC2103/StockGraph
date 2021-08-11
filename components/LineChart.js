import React from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartPriceValues: [],
      chartDateValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    var pointerToObject = this;

    var API_KEY = '3911619KY5PDLH26';
    var Stock = 'AMZN';
    var API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${Stock}&outputsize=compact&apikey=${API_KEY}`;

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
          for (var i in data['Time Series (Daily)']) {
            chartDateValuesCopy.push(i);
            chartPriceValuesCopy.push(data['Time Series (Daily)'][i]['1. open']);
          }
          pointerToObject.setState({
            chartDateValues: chartDateValuesCopy,
            chartPriceValues: chartPriceValuesCopy
          });
        }
      )
    }
  render() {
    return (
      <div>
        <Line
        data={{
          labels: this.state.chartDateValues,
          datasets:[{
            label: 'Stock Pricing',
            data: this.state.chartPriceValues,
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
}

export default LineChart;
