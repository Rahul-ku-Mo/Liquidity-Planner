export interface inflowValue {
  month: string;
  value: number;
}

export interface Inflows {
  Sales: inflowValue[];
  LoanDisbursement: inflowValue[];
  PrivateDepositsEquity: inflowValue[];
  OtherIncomingPayments: inflowValue[];
  OtherIncome: inflowValue[];
}

export const getInflows = (): Inflows[] => [
  {
    Sales: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    LoanDisbursement: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    PrivateDepositsEquity: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    OtherIncomingPayments: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
    OtherIncome: Array.from({ length: 12 }, () => ({
      month: "",
      value: Math.floor(Math.random() * 10000) + 1,
    })),
  },
];

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

getInflows()[0].Sales.forEach((sale, index) => {
  sale.month = months[index];
});

getInflows()[0].LoanDisbursement.forEach((loan, index) => {
  loan.month = months[index];
});

getInflows()[0].PrivateDepositsEquity.forEach((deposit, index) => {
  deposit.month = months[index];
});

getInflows()[0].OtherIncomingPayments.forEach((payment, index) => {
  payment.month = months[index];
});
getInflows()[0].OtherIncome.forEach((income, index) => {
  income.month = months[index];
});
