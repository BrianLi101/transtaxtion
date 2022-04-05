// provider for `use-nft`
import { getDefaultProvider } from 'ethers';
import { NftProvider, useNft } from 'use-nft';

import { ThemeProvider } from '@mui/material';
import { muiTheme } from 'src/styling/MUITheme';

// @ts-ignore
import logo from './logo.svg';
import './App.css';

import { TransactionsPage } from 'src/components/pages/TransactionsPage';

// We are using the "ethers" fetcher here.
const ethersConfig = {
  provider: getDefaultProvider('homestead'),
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <NftProvider fetcher={['ethers', ethersConfig]}>
          <TransactionsPage />
        </NftProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
