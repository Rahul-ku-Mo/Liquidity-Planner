export type BackgroundColor = "Green" | "Red" | "White" | "Black";
export type Color = "Black" | "White" | "Blue" | "Grey";

export interface LiquidFunds {
    cashbox: CashFlowValue[];
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
  
  
export interface TotalCashFlowValue {
  title: string;
  value: CashFlowValue[];
}