import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({ loading, style }) => {
  const [input, setInput] = useState<string>();
  let navigate = useNavigate();

  const search = () => {
    navigate('/address/' + input);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}
    >
      <OutlinedInput
        placeholder="Search By Ethereum Address (0x...)"
        endAdornment={
          <InputAdornment position="end" style={{ marginRight: 10 }}>
            {loading ? (
              <CircularProgress size={25} thickness={6} />
            ) : (
              <IconButton aria-label="Calculate" onClick={search} edge="end">
                <SearchRoundedIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(ev) => {
          if (ev.code === 'Enter') {
            console.log('entering to search');
            search();
          }
        }}
        style={{ borderRadius: 20, width: '100%', padding: 0 }}
      />
    </div>
  );
};
