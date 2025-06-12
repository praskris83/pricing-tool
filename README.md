# Pando CPQ Configuration Tool

This is a user-friendly configuration tool for managing Pando's pricing rules and settings. The tool consists of two main sections:

1. **Pricing Calculator**: Calculate pricing based on customer requirements
2. **Configuration Editor**: Edit pricing rules and settings

## Getting Started

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Open a terminal/command prompt
3. Navigate to the project directory
4. Run the following commands:
   ```bash
   npm install
   npm start
   ```
5. The application will open in your default web browser at `http://localhost:3000`

## Using the Pricing Calculator

The Pricing Calculator allows you to:
- Enter customer's annual freight spend
- Input monthly shipment volumes for different modes (FTL, LTL, Air, Ocean, Parcel)
- Select additional services
- Choose implementation type
- View calculated pricing in real-time

The calculator will automatically:
- Apply the correct pricing tier based on shipment volumes
- Calculate minimum monthly fees based on annual freight spend
- Add costs for selected services
- Show monthly recurring fees, annual totals, and implementation costs

## Using the Configuration Editor

The Configuration Editor allows you to modify pricing rules and settings. The configuration is stored in JSON format and includes:

1. **Shipment Rates**
   - Non-parcel rates (FTL, LTL, Air, Ocean)
   - Parcel rates
   - Volume-based tiering

2. **Minimum Monthly Fees**
   - Based on annual freight spend ranges

3. **Add-Ons**
   - Consulting services
   - Expert team
   - Other optional services

4. **Carrier Collaboration**
   - EDI-based rates
   - Email-based rates

5. **Enterprise Integration**
   - API integration costs
   - SFTP integration costs

6. **Implementation Services**
   - Standard (2-4 weeks)
   - Medium (5-8 weeks)
   - High (9-16 weeks)

### Editing Configuration

1. Click on the "Configuration Editor" tab
2. The current configuration will be displayed in a text editor
3. Make your changes following the JSON format
4. Click "Save Changes" to apply your changes
5. If you make a mistake, click "Reset to Default" to restore the original configuration

### Configuration Format

The configuration uses a simple JSON format. Here's an example structure:

```json
{
  "shipmentRates": {
    "nonParcel": {
      "100-5000": {
        "FTL": 0.40,
        "LTL": 0.35,
        "Air": 0.45,
        "Ocean": 0.50
      }
    },
    "parcel": {
      "5000-50000": 0.20
    }
  }
}
```

### Tips for Editing

1. Always maintain the JSON structure
2. Use numbers for rates and fees
3. Keep the range format consistent (e.g., "100-5000")
4. Don't remove required fields
5. Use the "Reset to Default" button if you're unsure about your changes

## Support

If you need help or encounter any issues:
1. Check that your JSON format is correct
2. Verify that all required fields are present
3. Ensure numbers are entered without currency symbols
4. Contact your technical support team if problems persist
