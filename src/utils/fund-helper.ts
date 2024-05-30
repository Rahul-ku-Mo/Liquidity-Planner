import { Inflows, Outflows, LiquidFunds } from "../types/types-interfaces";

export const months = [
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

export const getInflows = (): Inflows => {
  const data = {
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
  };

  return data;
};

export const getLiquidFunds = (): LiquidFunds => ({
  cashbox: months.map((month) => ({
    id: `cashbox-0-0`,
    month,
    value: Math.floor(Math.random() * 90000) + 1,
  })),
});

export const getOutflows = (): Outflows => {
  const data = {
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
  };

  return data;
};
