import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static" color="default" sx={{ mb: 2 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
          >
            Pricing Calculator
          </Button>
          <Button
            component={RouterLink}
            to="/config"
            color="inherit"
          >
            Configuration Editor
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 