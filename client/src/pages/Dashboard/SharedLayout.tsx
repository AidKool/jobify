import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, SmallSidebar, BigSidebar } from '../../components';

function SharedLayout() {
  const theme = useTheme();
  const mdWidthMatch = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box component="main" bgcolor="secondary.main">
      <Grid container minHeight="100vh">
        {mdWidthMatch && (
          <Grid item md={1.5} padding={1}>
            <BigSidebar />
          </Grid>
        )}
        {!mdWidthMatch && (
          <Grid item xs={12}>
            <SmallSidebar />
          </Grid>
        )}
        <Grid item xs={12} md={10.5}>
          <Box minHeight="100vh">
            <Navbar />
            <Box className="test">
              <Outlet />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SharedLayout;
