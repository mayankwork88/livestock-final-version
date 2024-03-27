import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Stack } from '@mui/material';
import { TypographyPrimary } from './themeComponents';


const InfoPane = ({message}) => {
  return (
    <Stack direction="row" alignItems="center" sx={{m:0,pl:1.5}}>
        <InfoOutlinedIcon fontSize='large' sx={{m:0,mr:0.5}} />
        <TypographyPrimary sx={{m:0}}>{message}</TypographyPrimary>
    </Stack>
  );
}

export default InfoPane;
