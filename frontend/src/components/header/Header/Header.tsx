import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from '../SearchBar';

import { HeaderContainer } from './styled';
import { HeaderProps } from './types';

export const Header = ({ hideSearchBar }: HeaderProps) => {
  let navigate = useNavigate();
  return (
    <HeaderContainer>
      <Typography
        variant="h4"
        style={{ fontFamily: 'Aquire', cursor: 'pointer' }}
        onClick={() => {
          navigate('/');
        }}
      >
        transtaxtion
      </Typography>
      {!hideSearchBar && <SearchBar style={{ width: 350 }} />}
    </HeaderContainer>
  );
};
