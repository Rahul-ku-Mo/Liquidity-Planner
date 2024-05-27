import React from "react";

import { Column, Row } from "@silevis/reactgrid";

import { LiquidFunds, Outflows, Inflows, CashFlowValue } from "../types/types-interfaces";

export const calculateTotal = (inflows: Inflows[] | Outflows[]): number => {
  return inflows.reduce((total, inflow) => {
    return (
      total +
      Object.values(inflow)
        .flat()
        .reduce((sum, { value }) => sum + (isNaN((value)) ? 0 : value), 0)
    );
  }, 0);
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
  liquidFunds: LiquidFunds[],
  inflows: Inflows[],
  outflows: Outflows[],
  setCashbox: React.Dispatch<React.SetStateAction<Array<number>>>,
  setCashInArray: React.Dispatch<React.SetStateAction<Array<number>>>,
  setCashOutArray: React.Dispatch<React.SetStateAction<Array<number>>>
): Row[] => [
  // headerRow,
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
      ...liquidFunds.map((item) => {
        setCashbox((prev) => [...prev, item.value]);

        return {
          type: "text",
          text: isNaN(item.value) ? "0" : item.value.toString(),
          className:
            "!font-regular !text-sm !flex !items-center !justify-center",
        };
      }),
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
  ...inflows
    .map((inflow, idx) => {
      const inflowEntries = Object.entries(inflow);

      return inflowEntries.map(([key, values], index) => ({
        rowId: `inflow-${idx}-${index}`,
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
      }));
    })
    .flat(),
  {
    rowId: "cashin-total",
    cells: [
      {
        type: "header",
        text: "Cash in (Total)",
        className:
          "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center ",
      },
      ...inflows
        .map((inflow) => {
          const inflowEntries: [
            string,
            { month: string; value: number; id: string }[]
          ][] = Object.entries(inflow);

          const newArray = [];
          for (let i = 0; i < 12; i++) {
            let sum = 0;
            for (let j = 0; j < inflowEntries.length; j++) {
              sum += Number(inflowEntries[j][1][i].value);
            }
            newArray.push(sum);
          }

          setCashInArray(newArray);

          
          return newArray.map((it: number) => ({
            type: "header",
            text: isNaN(it) ? "0" : it.toString(),
            className: "cell-box !tracking-tighter !font-semibold !text-sky-600",
          }));
        })
        .flat(),
      {
        type: "header",
        text: calculateTotal(inflows).toString(),
        className:
          "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
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
  ...outflows
    .map((outflow, idx) => {
      const inflowEntries = Object.entries(outflow);
      return inflowEntries.map(([key, values], index) => ({
        rowId: `outflow-${idx}-${index}`,
        cells: [
          {
            type: "header",
            text: key,
            className: "header-sub-cell",
          },
          ...values.map((item: CashFlowValue) => ({
            type: "text",
            text: isNaN(item.value) ? "0" : item.value.toString(),
            className: "cell-box",
          })),
          {
            type: "header",
            text: values
              .reduce(
                (acc: number, curr: CashFlowValue) =>
                  acc + curr.value,
                0
              )
              .toString(),
            className:
              "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
          },
        ],
        height: 40,
      }));
    })
    .flat(),
  {
    rowId: "cashout-total",
    cells: [
      {
        type: "header",
        text: "Cash Out (Total)",
        className:
          "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
      },
      ...outflows
        .map((outflow) => {
          const outflowEntries = Object.entries(outflow);

          const newArray = [];
          for (let i = 0; i < 12; i++) {
            let sum = 0;
            for (let j = 0; j < outflowEntries.length; j++) {
              sum += Number(outflowEntries[j][1][i].value);
            }
            newArray.push(sum);
          }

          setCashOutArray(newArray);

          
          return newArray.map((item: number) => ({
            type: "header",
            text: isNaN(item) ? "0" : item.toString(),
            className: "cell-box !tracking-tighter !font-semibold !text-red-600",
          }));
        })
        .flat(),
      {
        type: "header",
        text: calculateTotal(outflows).toString(),
        className:
          "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
      },
    ],
    height: 40,
  },
  {
    rowId: "emptyRow5",
    cells: [
      {
        type: "header",
        text: "Total",
        className: "header-cell",
      },
    ],
    height: 40,
  },
];
