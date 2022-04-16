// provider for `use-nft`
import { getDefaultProvider } from 'ethers';
import { NftProvider, useNft } from 'use-nft';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { Helmet } from 'react-helmet';

import { ThemeProvider } from '@mui/material';
import { muiTheme } from 'src/styling/MUITheme';

// @ts-ignore
import logo from './logo.svg';
import './App.css';

import { HomePage } from 'src/components/pages/HomePage';
import { TransactionsPage } from 'src/components/pages/TransactionsPage';
import { MobilePage } from 'src/components/pages/MobilePage';

// We are using the "ethers" fetcher here.
const ethersConfig = {
  provider: getDefaultProvider('homestead'),
};

function App() {
  return (
    <div className="App">
      <Helmet
        encodeSpecialCharacters={true}
        titleTemplate="transtaxtion"
        defer={false}
      >
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="learn about how your ethereum transactions are taxed"
        />
        <meta
          name="keywords"
          content="tax, crypto, ethereum, transaction, transtaxtion"
        />
        <meta property="og:url" content="https://transtaxtion.com/" />
        <meta property="og:type" content="website" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="transtaxtion" />
        <meta
          name="twitter:description"
          content="learn about how your ethereum transactions are taxed"
        />

        <title>transtaxtion</title>
      </Helmet>
      <ThemeProvider theme={muiTheme}>
        <NftProvider fetcher={['ethers', ethersConfig]}>
          <BrowserView>
            <BrowserRouter>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="address">
                  <Route path=":address" element={<TransactionsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </BrowserView>
          <MobileView>
            <MobilePage />
          </MobileView>
        </NftProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
