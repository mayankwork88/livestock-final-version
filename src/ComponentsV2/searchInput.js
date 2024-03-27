import React from 'react';
import {TextField, InputAdornment} from "@mui/material";
import {SearchIcon} from '../icons';

const SearchInput = ({placeholder,value,onChange}) => {
  return (
  <TextField
       fullWidth
        size="large"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="large" />
            </InputAdornment>
          ),
        }}
      />
  );
}

export default SearchInput;
