export type BackgroundColor = "Green" | "Red" | "White" | "Black";
export type Color = "Black" | "White" | "Blue" | "Grey";

export interface LiquidFunds {
    value: number;
    month: string;
    id: string;
  }
  
  export interface CashFlowValue {
    month: string;
    value: number;
    id: string;
  }
  
  export interface Inflows {
    Sales: CashFlowValue[];
    LoanDisbursement: CashFlowValue[];
    PrivateDepositsEquity: CashFlowValue[];
    OtherIncomingPayments: CashFlowValue[];
    OtherIncome: CashFlowValue[];
  }
  
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
  
  
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  
  export const getInflows = (): Inflows[] => {
    const data = [
      {
        Sales: months.map((month) => ({
          id: `inflow-0-0`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        LoanDisbursement: months.map((month) => ({
          id: `inflow-0-1`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        PrivateDepositsEquity: months.map((month) => ({
          id: `inflow-0-2`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        OtherIncomingPayments: months.map((month) => ({
          id: `inflow-0-3`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        OtherIncome: months.map((month) => ({
          id: `inflow-0-4`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
      },
    ];
  
    return data;
  };
  
  export const getLiquidFunds = (): LiquidFunds[] => [
    { month: "Jan", id: "cashbox-0-0", value: 3394 },
    { month: "Feb", id: "cashbox-0-0", value: 8394 },
    { month: "Mar", id: "cashbox-0-0", value: 4394 },
    { month: "Apr", id: "cashbox-0-0", value: 0 },
    { month: "May", id: "cashbox-0-0", value: 0 },
    { month: "Jun", id: "cashbox-0-0", value: 3394 },
    { month: "Jul", id: "cashbox-0-0", value: -3534 },
    { month: "Aug", id: "cashbox-0-0", value: 3094 },
    { month: "Sep", id: "cashbox-0-0", value: -3394 },
    { month: "Oct", id: "cashbox-0-0", value: -12394 },
    { month: "Nov", id: "cashbox-0-0", value: -32394 },
    { month: "Dec", id: "cashbox-0-0", value: -39421 },
  ];
  
  export const getOutflow = (): Outflows[] => {
    const data = [
      {
        useOfGoodsMaterials: months.map((month) => ({
          id: `outflow-0-0`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        heatingElectricityWaterGas: months.map((month) => ({
          id: `outflow-0-1`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        personnelCosts: months.map((month) => ({
          id: `outflow-0-2`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        roomCostsRent: months.map((month) => ({
          id: `outflow-0-3`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        marketingAndAdvertisement: months.map((month) => ({
          id: `outflow-0-4`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        vehicleCostsOperational: months.map((month) => ({
          id: `outflow-0-5`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        travelingExpenses: months.map((month) => ({
          id: `outflow-0-6`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        telephoneFaxInternet: months.map((month) => ({
          id: `outflow-0-7`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        officeSuppliesPackaging: months.map((month) => ({
          id: `outflow-0-8`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        repairsMaintenance: months.map((month) => ({
          id: `outflow-0-9`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        insuranceCompany: months.map((month) => ({
          id: `outflow-0-10`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        contributionsAndFees: months.map((month) => ({
          id: `outflow-0-11`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        leasing: months.map((month) => ({
          id: `outflow-0-12`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        adviceAndBookkeeping: months.map((month) => ({
          id: `outflow-0-13`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        costOfCapitalInterest: months.map((month) => ({
          id: `outflow-0-14`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
        repaymentLoan: months.map((month) => ({
          id: `outflow-0-15`,
          month,
          value: Math.floor(Math.random() * 10000) + 1,
        })),
      },
    ];
  
    return data;
  };
  