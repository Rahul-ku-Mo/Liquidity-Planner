import React from "react";

import { Column, Row } from "@silevis/reactgrid";

import {
  LiquidFunds,
  Outflows,
  Inflows,
  CashFlowValue,
} from "../types/types-interfaces";

import { months } from "./fund-helper";

export const calculateTotal = (inflow: Inflows | Outflows): number => {
  return Object.values(inflow)
    .flat()
    .reduce((sum, { value }) => sum + (isNaN(value) ? 0 : value), 0);
};

export const getColumns = (): Column[] => [
  { columnId: "Months", width: 200 },
  { columnId: "Jan", width: 150 },
  { columnId: "Feb", width: 150 },
  { columnId: "Mar", width: 150 },
  { columnId: "Apr", width: 150 },
  { columnId: "May", width: 150 },
  { columnId: "Jun", width: 150 },
  { columnId: "Jul", width: 150 },
  { columnId: "Aug", width: 150 },
  { columnId: "Sep", width: 150 },
  { columnId: "Oct", width: 150 },
  { columnId: "Nov", width: 150 },
  { columnId: "Dec", width: 150 },
  { columnId: "Totals", width: 200 },
];

export const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "" },
    {
      type: "header",
      text: "Jan",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Feb",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Mar",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Apr",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "May",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Jun",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Jul",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Aug",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Sep",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Oct",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Nov",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Dec",
      className: "column-cell-box",
    },
    {
      type: "header",
      text: "Totals",
      className: "column-cell-box",
    },
  ],
  height: 40,
};

export const getRows = (
  liquidFunds: LiquidFunds,
  inflows: Inflows,
  outflows: Outflows,
  setCashbox: React.Dispatch<React.SetStateAction<Array<number>>>,
  setCashInArray: React.Dispatch<React.SetStateAction<Array<number>>>,
  setCashOutArray: React.Dispatch<React.SetStateAction<Array<number>>>,
  setCumulativeCashArray: React.Dispatch<React.SetStateAction<Array<number>>>
): Row[] => {
  const inflowEntries = Object.entries(inflows);
  const outflowEntries = Object.entries(outflows);
  const liquidFundEntries = Object.entries(liquidFunds);

  const newArrayInflow: number[] = [];
  const newArrayOutflow: number[] = [];
  const newArrayCashbox: number[] = [];

  for (let i = 0; i < 12; i++) {
    let sumInflow = 0;
    let sumOutflow = 0;
    let sumCashbox = 0;
    for (let j = 0; j < inflowEntries.length; j++) {
      sumInflow += Number(inflowEntries[j][1][i].value);
    }

    for (let j = 0; j < outflowEntries.length; j++) {
      sumOutflow += Number(outflowEntries[j][1][i].value);
    }

    for (let j = 0; j < liquidFundEntries.length; j++) {
      sumCashbox += Number(liquidFundEntries[j][1][i].value);
    }

    newArrayInflow.push(sumInflow);
    newArrayOutflow.push(sumOutflow);
    newArrayCashbox.push(sumCashbox);
  }

  setCashInArray(newArrayInflow);
  setCashOutArray(newArrayOutflow);
  setCashbox(newArrayCashbox);

  const newTotalCashInOut = months.map((_month: string, index: number) => {
    const monthlyInflow = newArrayInflow[index];
    const monthlyOutflow = newArrayOutflow[index];

    return monthlyInflow - monthlyOutflow;
  });

  const cumulativeCash = months.map((_month: string, index: number) => {
    const monthlyCashInOutValue = newTotalCashInOut[index];
    const monthlyavailableCash = newArrayCashbox[index];
    return monthlyavailableCash + monthlyCashInOutValue;
  });

  setCumulativeCashArray(cumulativeCash);

  return [
    {
      rowId: "emptyRow",
      cells: [
        {
          type: "header",
          text: "Liquid Funds",
          className: "header-cell",
        },
        ...new Array(13).fill({ type: "header", text: "", nonEditable: true }),
      ],
      height: 40,
    },
    {
      rowId: "cashbox-0-0",
      cells: [
        {
          type: "header",
          text: "cashbox/banks",
          className: "header-sub-cell",
        },
        ...liquidFundEntries[0][1].map((item: CashFlowValue) => ({
          type: "text",
          text: isNaN(item.value) ? "0" : item.value.toString(),
          className: "cell-box !text-emerald-600 !font-semibold",
        })),
        {
          type: "header",
          text: liquidFundEntries[0][1]
            .reduce((acc: number, curr: CashFlowValue) => acc + curr.value, 0)
            .toString(),
          className:
            "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center !text-emerald-600",
        },
      ],
      height: 40,
    },
    {
      rowId: "emptyRow2",
      cells: [
        {
          type: "header",
          text: "Inflow",
          className: "header-cell",
        },
        ...new Array(13).fill({ type: "header", text: "", nonEditable: true }),
      ],
      height: 40,
    },
    ...inflowEntries.map(([key, values], index) => ({
      rowId: `inflow-0-${index}`,
      cells: [
        {
          type: "header",
          text: key,
          className: "header-sub-cell",
        },
        ...(values as { month: string; value: number; id: string }[]).map(
          (item) => ({
            type: "text",
            text: isNaN(item.value) ? "0" : item.value.toString(),
            className: "cell-box",
          })
        ),
        {
          type: "header",
          text: (values as { month: string; value: number; id: string }[])
            .reduce(
              (
                acc: number,
                curr: { month: string; value: number; id: string }
              ) => acc + curr.value,
              0
            )
            .toString(),
          className:
            "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
        },
      ],
      height: 40,
    })),
    {
      rowId: "cashin-total",
      cells: [
        {
          type: "header",
          text: "Cash in (Total)",
          className:
            "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center ",
        },

        ...newArrayInflow.map((item: number) => ({
          type: "header",
          text: isNaN(item) ? "0" : item.toString(),
          className: "cell-box !tracking-tighter !font-semibold !text-sky-600",
        })),
        {
          type: "header",
          text: calculateTotal(inflows).toString(),
          className:
            "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center !text-sky-600",
        },
      ],
      height: 40,
    },
    {
      rowId: "emptyRow4",
      cells: [
        {
          type: "header",
          text: "Outflow",
          className: "header-cell",
        },
        ...new Array(13).fill({ type: "header", text: "", nonEditable: true }),
      ],
      height: 40,
    },
    ...outflowEntries.map(([key, values], index) => ({
      rowId: `outflow-0-${index}`,
      cells: [
        {
          type: "header",
          text: key,
          className: "header-sub-cell",
        },
        ...(values as { month: string; value: number; id: string }[]).map(
          (item) => ({
            type: "text",
            text: isNaN(item.value) ? "0" : item.value.toString(),
            className: "cell-box",
          })
        ),
        {
          type: "header",
          text: (values as { month: string; value: number; id: string }[])
            .reduce(
              (
                acc: number,
                curr: { month: string; value: number; id: string }
              ) => acc + curr.value,
              0
            )
            .toString(),
          className:
            "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
        },
      ],
      height: 40,
    })),
    {
      rowId: "cashout-total",
      cells: [
        {
          type: "header",
          text: "Cash Out (Total)",
          className:
            "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
        },
        ...newArrayOutflow.map((item: number) => ({
          type: "header",
          text: isNaN(item) ? "0" : item.toString(),
          className: "cell-box !tracking-tighter !font-semibold !text-red-600",
        })),
        {
          type: "header",
          text: calculateTotal(outflows).toString(),
          className:
            "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center !text-red-600",
        },
      ],
      height: 40,
    },

    {
      rowId: "total-cash-in-out",
      cells: [
        {
          type: "header",
          text: "Total",
          className: "header-cell",
        },
        ...newTotalCashInOut.map((item: number) => ({
          type: "header",
          text: item.toString(),
          className: "header-cell",
        })),
        {
          type: "header",
          text: newTotalCashInOut.reduce((acc, curr) => acc + curr, 0).toString(),
          className: "header-cell",
        }
      ],
      height: 40,
    },
    {
      rowId: "cumulative-cash",
      cells: [
        {
          type: "header",
          text: "Cumulative",
          className: "header-cell",
        },
        ...cumulativeCash.map((item: number) => ({
          type: "header",
          text: item.toString(),
          className: "header-cell !text-purple-700",
        })),
        {
          type: "header",
          text: cumulativeCash.reduce((acc, curr) => acc + curr, 0).toString(),
          className: "header-cell !text-purple-700",
        }
      ],
      height: 40,
    },
  ];
};
