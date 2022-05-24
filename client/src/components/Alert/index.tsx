import React from 'react';
import { Box, Typography } from '@mui/material';

type AlertTypeProps = {
  type: string;
};

function Alert({ type }: AlertTypeProps) {
  return (
    <Box
      textAlign="center"
      padding={1}
      borderRadius={1}
      sx={
        type === 'success'
          ? {
              bgcolor: 'success.light',
            }
          : {
              bgcolor: 'error.light',
            }
      }>
      <Typography color={`${type === 'success' ? 'success.dark' : 'error.dark'}`}>alert</Typography>
    </Box>
  );
}

export default Alert;
