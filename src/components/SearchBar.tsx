import React, { useState, useEffect, useCallback } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useEmployee } from '../hooks/useEmployee';

const SearchBar: React.FC = () => {
  const { filter, setFilter } = useEmployee();
  const [searchTerm, setSearchTerm] = useState(filter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(searchTerm.trim());
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm, setFilter]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    setFilter('');
  }, [setFilter]);

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
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search"
              onClick={handleClear}
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

export default React.memo(SearchBar);
