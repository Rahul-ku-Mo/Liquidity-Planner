import { useState, useMemo } from "react";
import { ReactGrid, CellChange, TextCell } from "@silevis/reactgrid";

import Header from "./layouts/header";

import { getLiquidFunds, getInflows } from "./components/funds";

import { getOutflow } from "./components/funds";

import {
  LiquidFunds,
  Inflows,
  Outflows,
  CashFlowValue,
  Color, BackgroundColor
} from "./types/types-interfaces";

import { getRows, getColumns } from "./utils/grid-helper";

import FinancialChart from "./components/financial-chart";
import CustomHeader from "./components/custom-header";
import { headerRow } from "./utils/grid-helper";

import { SelectChangeEvent } from "@mui/material";

import "@silevis/reactgrid/styles.css";
import CustomSelectHeader from "./components/custom-select-header";

const App = () => {
  const [liquidFunds, setLiquidFunds] = useState<LiquidFunds[]>(
    getLiquidFunds()
  );
  const [inflows, setInflows] = useState<Inflows[]>(getInflows());
  const [outflows, setOutflows] = useState<Outflows[]>(getOutflow());

  const [cashInArray, setCashInArray] = useState<number[]>([]);
  const [cashOutArray, setCashOutArray] = useState<number[]>([]);
  const [cashbox, setCashbox] = useState<number[]>([]);

  const handleFundsChange = (changes: CellChange<TextCell>[]) => {
    changes.forEach((change) => {
      const fundIndex = change.rowId as string;
      const fieldName = change.columnId as string;

      if (fundIndex.startsWith("inflow")) {
        const inflowEntries = Object.entries(inflows[0]);

        inflowEntries.map(([key, values]) => {
          const inflowFund = values.find(
            (item: CashFlowValue) =>
              fundIndex.includes(item.id) && fieldName.includes(item.month)
          );

          if (inflowFund) {
            const newInflows = inflows.map((fund: Inflows) => {
              const newValues = fund[key as keyof Inflows].map(
                (item: CashFlowValue) => {
                  // Add a type assertion to keyof Inflows
                  if (item.id === fundIndex && item.month === fieldName) {
                    return { ...item, value: Number(change.newCell.text) };
                  }
                  return item;
                }
              );

              return { ...fund, [key]: newValues };
            });

            setInflows(newInflows);
          }
        });
      } else if (fundIndex.startsWith("outflow")) {
        const outflowEntries = Object.entries(outflows[0]);

        outflowEntries.map(([key, values]) => {
          const outflowFund = values.find(
            (item: CashFlowValue) =>
              fundIndex.includes(item.id) && fieldName.includes(item.month)
          );

          if (outflowFund) {
            const newOutflows = outflows.map((fund) => {
              const newValues = fund[key as keyof Outflows].map(
                (item: CashFlowValue) => {
                  // Add a type assertion to keyof Outflows
                  if (item.id === fundIndex && item.month === fieldName) {
                    return { ...item, value: Number(change.newCell.text) };
                  }
                  return item;
                }
              );

              return { ...fund, [key]: newValues };
            });

            setOutflows(newOutflows);
          }
        });
      } else {
        const newLiquidFunds = liquidFunds.map((fund) => {
          if (fund.id === fundIndex && fund.month === fieldName) {
            return { ...fund, value: Number(change.newCell.text) };
          }
          return fund;
        });

        setLiquidFunds(newLiquidFunds);
      }
    });
  };

  const rows = useMemo(
    () =>
      getRows(
        liquidFunds,
        inflows,
        outflows,
        setCashbox,
        setCashInArray,
        setCashOutArray
      ),
    [liquidFunds, inflows, outflows]
  );

  const columns = useMemo(getColumns, []);


  const [color, setColor] = useState<Color>("White");
  const [backgroundColor, setBackgroundColor] =
    useState<BackgroundColor>("Green");

  const handleColorChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as Color);
  };

  const handleBackgroundColorChange = (event: SelectChangeEvent) => {
    setBackgroundColor(event.target.value as BackgroundColor);
  };

  return (
    <>
      <Header />

      <main className="w-full overflow-x-auto">
        <CustomSelectHeader color={color} backgroundColor={backgroundColor} handleColor={handleColorChange} handleBackgroundColor={handleBackgroundColorChange} />
        <FinancialChart
          cashInArray={cashInArray}
          cashOutArray={cashOutArray}
          cashbox={cashbox}
        />
        <div className="flex text-lg font-bold justify-between items-center ml-[6.2rem] min-w-[2100px]">
          {headerRow.cells.map((cell, index) =>
            (cell as TextCell).text === "" ? (
              <CustomHeader BackgroundColor="White" Color="White" key={index}>
                {(cell as TextCell)?.text}
              </CustomHeader>
            ) : (
              <CustomHeader
                BackgroundColor={backgroundColor}
                Color={color}
                key={index}
                sx={{
                  position: "sticky",
                  right: 0,
                }}
                Width={index === headerRow.cells.length - 1 ? 200 : 150}
              >
                {(cell as TextCell)?.text}
              </CustomHeader>
            )
          )}
        </div>
        <ReactGrid
          rows={rows}
          columns={columns}
          stickyRightColumns={1}
          stickyLeftColumns={1}
          onCellsChanged={(changes) =>
            handleFundsChange(changes as CellChange<TextCell>[])
          }
        />
      </main>
    </>
  );
};

export default App;
