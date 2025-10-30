import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useEmployee } from '../hooks/useEmployee';

const SearchBar: React.FC = () => {
  const { filter, setFilter } = useEmployee();

  return (
    <TextField
      fullWidth
      placeholder="Search by name, email, or phone number..."
      variant="outlined"
      sx={{
        mb: 2,
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 4,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: filter && (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search"
              onClick={() => setFilter('')}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;