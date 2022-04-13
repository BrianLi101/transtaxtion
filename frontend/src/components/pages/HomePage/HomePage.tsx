import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Header } from 'src/components/header';

import { SearchBar } from 'src/components/header/SearchBar';
import { PageColumn } from 'src/components/general';
import { DEMO_WALLET_ADDRESS } from 'src/resources/constants';

import { Page } from '../styled';

import { HomePageBody } from './styled';

export const HomePage = () => {
  let navigate = useNavigate();
  return (
    <Page>
      <Header hideSearchBar />
      <HomePageBody>
        <PageColumn>
          <Typography variant="h3" style={{ marginBottom: 20 }}>
            learn about what's taxable in your wallet.
          </Typography>
          <SearchBar />
          <Button
            onClick={() => {
              navigate('/address/' + DEMO_WALLET_ADDRESS);
            }}
          >
            See Demo
          </Button>
        </PageColumn>
      </HomePageBody>
    </Page>
  );
};
