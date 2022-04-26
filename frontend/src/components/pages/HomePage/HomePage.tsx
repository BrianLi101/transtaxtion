import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Header } from 'src/components/header';
import { Footer } from 'src/components/footer/Footer';

import { SearchBar } from 'src/components/header/SearchBar';
import { PageColumn } from 'src/components/general';
import { DEMO_WALLET_ADDRESS } from 'src/resources/constants';

import { Page } from '../styled';

import { DemoTransaction } from './DemoTransaction';
import { HomePageBody } from './styled';

export const HomePage = () => {
  let navigate = useNavigate();
  return (
    <Page>
      <HomePageBody>
        <PageColumn>
          <Typography variant="h4" style={{ fontFamily: 'Aquire' }}>
            transtaxtion
          </Typography>
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            learn about how your ethereum transactions are taxed
          </Typography>
          <div style={{ width: '80%', maxWidth: 600, margin: 'auto' }}>
            <SearchBar />
            <Button
              onClick={() => {
                navigate('/address/' + DEMO_WALLET_ADDRESS);
              }}
            >
              See Demo
            </Button>
          </div>
          <div style={{ height: 50 }} />
          <DemoTransaction />
        </PageColumn>
      </HomePageBody>
      <Footer />
    </Page>
  );
};
