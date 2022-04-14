import { Link, Typography } from '@mui/material';

import { FooterContainer } from './styled';

export const Footer = () => {
  return (
    <FooterContainer>
      <Typography>
        built by{' '}
        <Link
          href="https://twitter.com/brianli101"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          @brianli101
        </Link>
        <span style={{ marginLeft: 5, marginRight: 5 }}>❤️</span>
        powered by{' '}
        <Link
          href="https://twitter.com/etherscan"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          @etherscan
        </Link>
      </Typography>
    </FooterContainer>
  );
};
