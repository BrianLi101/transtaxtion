// provider for `use-nft`
import { getDefaultProvider } from 'ethers';
import { NftProvider, useNft } from 'use-nft';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { muiTheme } from 'src/styling/MUITheme';

// @ts-ignore
import logo from './logo.svg';
import './App.css';

import { HomePage } from 'src/components/pages/HomePage';
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
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="address">
                <Route path=":address" element={<TransactionsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </NftProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
