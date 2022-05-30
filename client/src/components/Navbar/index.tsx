import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: '#fff' }}>
        <Toolbar>
          <Typography>Navbar</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
