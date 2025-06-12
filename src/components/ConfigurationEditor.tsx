import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { PricingConfig } from '../types';
import pricingConfig from '../config/pricingConfig.json';

const ConfigurationEditor: React.FC = () => {
  const [config, setConfig] = useState<PricingConfig>(pricingConfig);
  const [configString, setConfigString] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setConfigString(JSON.stringify(config, null, 2));
  }, [config]);

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(configString);
      setConfig(parsedConfig);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Invalid JSON format. Please check your configuration.');
    }
  };

  const handleReset = () => {
    setConfig(pricingConfig);
    setConfigString(JSON.stringify(pricingConfig, null, 2));
    setError('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configuration Editor
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Edit the configuration below. The configuration is in JSON format. Make sure to maintain the correct structure and format.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={20}
            value={configString}
            onChange={(e) => setConfigString(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ fontFamily: 'monospace' }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              Reset to Default
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Configuration saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConfigurationEditor; 