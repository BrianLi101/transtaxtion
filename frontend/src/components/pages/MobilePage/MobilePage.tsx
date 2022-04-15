import { Typography } from '@mui/material';
import { Page } from '../styled';

export const MobilePage = () => {
  return (
    <Page style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3" style={{ fontFamily: 'Aquire' }}>
        transtaxtion
      </Typography>
      <Typography variant="h5" style={{ marginTop: 40 }}>
        crypto taxes suck,
      </Typography>
      <Typography variant="h5">on mobile, this website does too.</Typography>
      <Typography variant="h5" style={{ marginTop: 40 }}>
        try it on your computer instead!
      </Typography>
    </Page>
  );
};
