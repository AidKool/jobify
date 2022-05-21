import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Landing from './pages/Landing';
import { ThemeProvider } from '@mui/material';

import theme from './store/theme/theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Landing />
      </ThemeProvider>
    </div>
  );
}

export default App;
