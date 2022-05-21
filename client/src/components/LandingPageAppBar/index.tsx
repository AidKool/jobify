import React from 'react';
import { Box, AppBar, Toolbar, Container } from '@mui/material';
import logo from '../../assets/images/logo.svg';

function LandingPageAppBar() {
  return (
    <AppBar sx={{ boxShadow: 0, paddingTop: '0.5rem', paddingBottom: '0.5rem' }} color="secondary">
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: '0 !important' }}>
          <Box component="img" sx={{ height: 48 }} alt="logo" src={logo} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LandingPageAppBar;
