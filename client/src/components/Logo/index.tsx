import React from 'react';
import { Box } from '@mui/material';

import logo from '../../assets/images/logo.svg';

function Logo() {
  return <Box component="img" sx={{ height: 48 }} alt="jobify logo" src={logo} />;
}

export default Logo;
