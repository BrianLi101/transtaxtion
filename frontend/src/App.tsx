// @ts-ignore
import logo from './logo.svg';
import './App.css';

import EtherscanAPI from './managers/EtherscanAPI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => {
            EtherscanAPI.getNormalTransactionsByAddress(
              process.env.REACT_APP_TEST_WALLET_ADDRESS!
            );
          }}
        >
          Test Etherscan
        </button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
