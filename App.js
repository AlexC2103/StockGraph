import './App.css';
import LineChart from './components/LineChart';
import StockName from './components/StockNameInput';

function App() {
  return (
    <div>
      <div>
        <StockName/>
      </div>
      <div>
        <LineChart/>
      </div>
    </div>
  );
}

export default App;
