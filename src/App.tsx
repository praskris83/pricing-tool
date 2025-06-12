import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Navigation from './components/Navigation';
import PricingCalculator from './components/PricingCalculator';
import ConfigurationEditor from './components/ConfigurationEditor';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <Box
                component="img"
                src="/Pando_logo.png"
                alt="Pando Logo"
                sx={{
                  height: 40,
                  marginRight: 2,
                  objectFit: 'contain'
                }}
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pricing Configuration Tool
              </Typography>
            </Toolbar>
          </AppBar>
          <Navigation />
          <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
            <Routes>
              <Route path="/" element={<PricingCalculator />} />
              <Route path="/config" element={<ConfigurationEditor />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
