import { ThemeProvider } from '@mui/material';
import { muiTheme } from 'src/styling/MUITheme';

// @ts-ignore
import logo from './logo.svg';
import './App.css';

import EtherscanAPI from './managers/EtherscanAPI';
import { TransactionsPage } from 'src/components/pages/TransactionsPage';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <TransactionsPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
