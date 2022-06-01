import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import NavLinks from '../NavLinks';

function BigSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Box>
      {!showSidebar && (
        <Box width="100%" paddingY={2.5}>
          <Typography variant="h4" textAlign="center" textTransform="capitalize">
            dashboard
          </Typography>
          <NavLinks toggleSidebar={toggleSidebar} />
        </Box>
      )}
    </Box>
  );
}

export default BigSidebar;
