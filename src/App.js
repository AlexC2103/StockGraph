import './App.css';
import LineChart from './components/LineChart';
import StockNameInput from './components/StockNameInput';
import { useState } from 'react';

function App() {

  const [stock, setStock] = useState('');

  return (
    <div>
      <div className="App-Component">
        <StockNameInput onChange={setStock}/>
      </div>
      <br></br>
      <div>
        <LineChart symbol={stock}/>
      </div>
    </div>
  );
}

export default App;
