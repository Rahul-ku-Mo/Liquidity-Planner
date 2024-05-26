import { useState } from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";

import Header from "./layouts/header";

import { LiquidFunds, getLiquidFunds } from "./components/liquidFunds";
import { Inflows, getInflows } from "./components/Inflows";
import {
  Outflows,
  getOutFlow,
  // getTotalExpenses,
} from "./components/liquidFunds";

import "@silevis/reactgrid/styles.css";
import FinancialChart from "./components/financial-chart";

const cashInArray: number[] = [];
const cashOutArray: number[] = [];
const cashbox: string[] = [];

const calculateTotal = (inflows: Inflows[] | Outflows[]): number => {
  return inflows.reduce((total, inflow) => {
    return (
      total +
      Object.values(inflow)
        .flat()
        .reduce((sum, { value }) => sum + value, 0)
    );
  }, 0);
};

const getColumns = (): Column[] => [
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
  { columnId: "Totals", width: 180 },
];

const headerRow: Row = {
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

const getRows = (
  liquidFunds: LiquidFunds[],
  inflows: Inflows[],
  outflows: Outflows[]
): Row[] => [
  headerRow,
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
    rowId: "cashbox",
    cells: [
      {
        type: "header",
        text: "cashbox/banks",
        className: "header-sub-cell",
      },
      ...liquidFunds.map((item) => {
        cashbox.push(item.cashbox);

        return {
          type: "text",
          text: item.cashbox,
          className: "cell-box",
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
          ...values.map((it: { month: string; value: number }) => ({
            type: "text",
            text: it.value.toString(),
            className: "cell-box",
          })),
          {
            type: "header",
            text: values
              .reduce(
                (acc: number, curr: { month: string; value: number }) =>
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
    rowId: "cashin-total",
    cells: [
      {
        type: "header",
        text: "Cash in (Total)",
        className:
          "!font-bold !text-sm !tracking-tighter !flex !justify-center !items-center",
      },
      ...inflows
        .map((inflow) => {
          const inflowEntries = Object.entries(inflow);

          const newArray = [];
          for (let i = 0; i < 12; i++) {
            let sum = 0;
            for (let j = 0; j < inflowEntries.length; j++) {
              sum += inflowEntries[j][1][i].value;
            }
            newArray.push(sum);
            cashInArray.push(sum);
          }

          return newArray.map((it: number) => ({
            type: "header",
            text: it.toString(),
            className: "cell-box !tracking-tighter !font-semibold",
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
          ...values.map((it: { month: string; value: number }) => ({
            type: "text",
            text: it.value.toString(),
            className: "cell-box",
          })),
          {
            type: "header",
            text: values
              .reduce(
                (acc: number, curr: { month: string; value: number }) =>
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

          const newArray = new Array(11);
          for (let i = 0; i < 12; i++) {
            let sum = 0;
            for (let j = 0; j < outflowEntries.length; j++) {
              sum += outflowEntries[j][1][i].value;
            }
            newArray.push(sum);
            cashOutArray.push(sum);
          }

          return newArray.map((it: number) => ({
            type: "header",
            text: it.toString(),
            className: "cell-box !tracking-tighter !font-semibold",
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

const App = () => {
  const [liquidFunds] = useState<LiquidFunds[]>(getLiquidFunds());
  const [inflows] = useState<Inflows[]>(getInflows());
  const [outFlows] = useState<Outflows[]>(getOutFlow());

  const rows = getRows(liquidFunds, inflows, outFlows);
  const columns = getColumns();

  return (
    <>
      <Header />
      <FinancialChart cashInArray={cashInArray} cashOutArray={cashOutArray} cashbox={cashbox} />
      <main className="w-full overflow-x-auto">
      <ReactGrid rows={rows} columns={columns} stickyRightColumns={1} stickyLeftColumns={1}  />
      </main>
    </>
  );
};

export default App;
