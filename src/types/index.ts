export interface ShipmentRates {
  nonParcel: {
    [key: string]: {
      FTL: number;
      LTL: number;
      Air: number;
      Ocean: number;
    };
  };
  parcel: {
    [key: string]: number;
  };
}

export interface MinimumMonthlyFees {
  [key: string]: number;
}

export interface AddOns {
  consultingServices: {
    listPrice: number;
    floorPrice: number;
  };
  expertTeam: {
    listPrice: number;
    floorPrice: number;
    hours: number;
  };
}

export interface CarrierCollaboration {
  edi: {
    listPrice: number;
    floorPrice: number;
  };
  email: {
    listPrice: number;
    floorPrice: number;
  };
}

export interface EnterpriseIntegration {
  api: number;
  sftp: number;
}

export interface ImplementationServices {
  standard: {
    weeks: string;
    price: number;
  };
  medium: {
    weeks: string;
    price: number;
  };
  high: {
    weeks: string;
    price: number;
  };
}

export interface PricingConfig {
  shipmentRates: ShipmentRates;
  minimumMonthlyFees: MinimumMonthlyFees;
  addOns: AddOns;
  carrierCollaboration: CarrierCollaboration;
  enterpriseIntegration: EnterpriseIntegration;
  implementationServices: ImplementationServices;
}

export interface CustomerInput {
  annualFreightSpend: number;
  monthlyShipments: {
    FTL: number;
    LTL: number;
    Air: number;
    Ocean: number;
    Parcel: number;
  };
  carriers: {
    freight: number;
    parcel: number;
  };
  integrations: {
    api: number;
    sftp: number;
  };
  addOns: {
    expertTeam: boolean;
    consultingServices: boolean;
    glCoding: boolean;
    spotRateRepository: boolean;
    freightBenchmarking: boolean;
  };
  implementationType: 'standard' | 'medium' | 'high';
} 