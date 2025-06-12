import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { CustomerInput } from '../types';
import pricingConfig from '../config/pricingConfig.json';

const PricingCalculator: React.FC = () => {
  const [customerInput, setCustomerInput] = useState<CustomerInput>({
    annualFreightSpend: 0,
    monthlyShipments: {
      FTL: 0,
      LTL: 0,
      Air: 0,
      Ocean: 0,
      Parcel: 0,
    },
    carriers: {
      freight: 0,
      parcel: 0,
    },
    integrations: {
      api: 0,
      sftp: 0,
    },
    addOns: {
      expertTeam: false,
      consultingServices: false,
      glCoding: false,
      spotRateRepository: false,
      freightBenchmarking: false,
    },
    implementationType: 'standard',
  });

  const [totalPrice, setTotalPrice] = useState<{
    monthly: number;
    annual: number;
    implementation: number;
  }>({
    monthly: 0,
    annual: 0,
    implementation: 0,
  });

  const calculatePricing = () => {
    // Calculate shipment-based pricing
    let shipmentTotal = 0;
    const totalNonParcel = Object.values(customerInput.monthlyShipments)
      .filter((_, index) => index < 4)
      .reduce((sum, val) => sum + val, 0);

    // Find the appropriate tier for non-parcel shipments
    const nonParcelTier = Object.entries(pricingConfig.shipmentRates.nonParcel)
      .find(([range]) => {
        const [min, max] = range.split('-').map(Number);
        return totalNonParcel >= min && totalNonParcel <= max;
      });

    if (nonParcelTier) {
      const [, rates] = nonParcelTier;
      shipmentTotal += customerInput.monthlyShipments.FTL * rates.FTL;
      shipmentTotal += customerInput.monthlyShipments.LTL * rates.LTL;
      shipmentTotal += customerInput.monthlyShipments.Air * rates.Air;
      shipmentTotal += customerInput.monthlyShipments.Ocean * rates.Ocean;
    }

    // Calculate parcel pricing
    const parcelTier = Object.entries(pricingConfig.shipmentRates.parcel)
      .find(([range]) => {
        const [min, max] = range.split('-').map(Number);
        return customerInput.monthlyShipments.Parcel >= min && 
               customerInput.monthlyShipments.Parcel <= max;
      });

    if (parcelTier) {
      const [, rate] = parcelTier;
      shipmentTotal += customerInput.monthlyShipments.Parcel * rate;
    }

    // Find minimum monthly fee based on annual freight spend
    const minFeeTier = Object.entries(pricingConfig.minimumMonthlyFees)
      .find(([range]) => {
        const [min, max] = range.split('-').map(Number);
        return customerInput.annualFreightSpend >= min && 
               customerInput.annualFreightSpend <= max;
      });

    const minMonthlyFee = minFeeTier ? minFeeTier[1] : 0;
    const baseMonthlyFee = Math.max(shipmentTotal, minMonthlyFee);

    // Calculate add-ons
    let addOnTotal = 0;
    if (customerInput.addOns.expertTeam) {
      addOnTotal += pricingConfig.addOns.expertTeam.floorPrice;
    }
    if (customerInput.addOns.consultingServices) {
      addOnTotal += pricingConfig.addOns.consultingServices.floorPrice;
    }

    // Calculate carrier collaboration fees
    const carrierFees = 
      customerInput.carriers.freight * pricingConfig.carrierCollaboration.edi.floorPrice +
      customerInput.carriers.parcel * pricingConfig.carrierCollaboration.email.floorPrice;

    // Calculate integration fees
    const integrationFees = 
      customerInput.integrations.api * pricingConfig.enterpriseIntegration.api +
      customerInput.integrations.sftp * pricingConfig.enterpriseIntegration.sftp;

    // Calculate implementation cost
    const implementationCost = 
      pricingConfig.implementationServices[customerInput.implementationType].price;

    setTotalPrice({
      monthly: baseMonthlyFee + addOnTotal,
      annual: (baseMonthlyFee + addOnTotal) * 12 + carrierFees + integrationFees,
      implementation: implementationCost,
    });
  };

  useEffect(() => {
    calculatePricing();
  }, [customerInput, calculatePricing]);

  const handleInputChange = (field: string, value: any) => {
    setCustomerInput(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShipmentChange = (mode: string, value: number) => {
    setCustomerInput(prev => ({
      ...prev,
      monthlyShipments: {
        ...prev.monthlyShipments,
        [mode]: value,
      },
    }));
  };

  const handleAddOnChange = (addOn: string, checked: boolean) => {
    setCustomerInput(prev => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [addOn]: checked,
      },
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pricing Calculator
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <TextField
              fullWidth
              label="Annual Freight Spend ($)"
              type="number"
              value={customerInput.annualFreightSpend}
              onChange={(e) => handleInputChange('annualFreightSpend', Number(e.target.value))}
              margin="normal"
            />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Monthly Shipment Volumes
            </Typography>
            {Object.entries(customerInput.monthlyShipments).map(([mode, value]) => (
              <TextField
                key={mode}
                fullWidth
                label={`${mode} Shipments`}
                type="number"
                value={value}
                onChange={(e) => handleShipmentChange(mode, Number(e.target.value))}
                margin="normal"
              />
            ))}
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Services
            </Typography>
            <FormGroup>
              {Object.entries(customerInput.addOns).map(([addOn, checked]) => (
                <FormControlLabel
                  key={addOn}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(e) => handleAddOnChange(addOn, e.target.checked)}
                    />
                  }
                  label={addOn.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
            </FormGroup>
            <FormControl fullWidth margin="normal">
              <InputLabel>Implementation Type</InputLabel>
              <Select
                value={customerInput.implementationType}
                onChange={(e) => handleInputChange('implementationType', e.target.value)}
                label="Implementation Type"
              >
                <MenuItem value="standard">Standard (2-4 weeks)</MenuItem>
                <MenuItem value="medium">Medium (5-8 weeks)</MenuItem>
                <MenuItem value="high">High (9-16 weeks)</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <Typography variant="h6" gutterBottom>
            Pricing Summary
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">
                Monthly Recurring Fee: ${totalPrice.monthly.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">
                Annual Total: ${totalPrice.annual.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">
                Implementation Cost: ${totalPrice.implementation.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default PricingCalculator; 