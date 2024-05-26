export interface LiquidFunds {
  cashbox: string;
  className: string;
}

export interface CashFlowValue {
  month: string;
  value: number;
}

export const getLiquidFunds = (): LiquidFunds[] => [
  { cashbox: "3394", className: "font-regular" },
  { cashbox: "8394", className: "font-regular" },
  { cashbox: "4394", className: "font-regular" },
  { cashbox: "1394", className: "font-regular" },
  { cashbox: "2394", className: "font-regular" },
  { cashbox: "3394", className: "font-regular" },
  { cashbox: "-3534", className: "font-regular" },
  { cashbox: "3094", className: "font-regular" },
  { cashbox: "-3394", className: "font-regular" },
  { cashbox: "-12394", className: "font-regular" },
  { cashbox: "-32394", className: "font-regular" },
  { cashbox: "-39421", className: "font-regular" },
];

export interface Outflows {
  useOfGoodsMaterials: CashFlowValue[];
  heatingElectricityWaterGas: CashFlowValue[];
  personnelCosts: CashFlowValue[];
  roomCostsRent: CashFlowValue[];
  marketingAndAdvertisement: CashFlowValue[];
  vehicleCostsOperational: CashFlowValue[];
  travelingExpenses: CashFlowValue[];
  telephoneFaxInternet: CashFlowValue[];
  officeSuppliesPackaging: CashFlowValue[];
  repairsMaintenance: CashFlowValue[];
  insuranceCompany: CashFlowValue[];
  contributionsAndFees: CashFlowValue[];
  leasing: CashFlowValue[];
  adviceAndBookkeeping: CashFlowValue[];
  costOfCapitalInterest: CashFlowValue[];
  repaymentLoan: CashFlowValue[];
}

export const getOutFlow = (): Outflows[] => [
  {
    useOfGoodsMaterials: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    heatingElectricityWaterGas: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    personnelCosts: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    roomCostsRent: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    marketingAndAdvertisement: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    vehicleCostsOperational: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    travelingExpenses: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    telephoneFaxInternet: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    officeSuppliesPackaging: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    repairsMaintenance: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    insuranceCompany: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    contributionsAndFees: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    leasing: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    adviceAndBookkeeping: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    costOfCapitalInterest: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    repaymentLoan: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
  },
];
