import { useState, useMemo, useEffect } from "react";
import { ReactGrid, CellChange, TextCell } from "@silevis/reactgrid";

import { SelectChangeEvent } from "@mui/material";

import {
  getLiquidFunds,
  ArrayToInflowObject,
  ArrayToOutflowObject,
  ArrayToLiquidFundObject,
  CropIdAndSource,
} from "./utils/fund-helper";

import {
  LiquidFunds,
  Inflows,
  Outflows,
  CashFlowValue,
  Color,
  BackgroundColor,
} from "./types/types-interfaces";

import { headerRow } from "./utils/grid-helper";
import { getRows, getColumns } from "./utils/grid-helper";

import Header from "./layouts/header";
import CustomHeader from "./components/chart/custom-header";
import FinancialChart from "./components/chart/financial-chart";
import CustomSelectHeader from "./components/chart/custom-select-header";

import "@silevis/reactgrid/styles.css";

const App = () => {
  const [liquidFunds, setLiquidFunds] = useState<LiquidFunds>(getLiquidFunds());
  const [inflows, setInflows] = useState<Inflows>({} as Inflows);
  const [outflows, setOutflows] = useState<Outflows>({} as Outflows);

  const [liquidFundsArray, setLiquidFundsArray] = useState<
    { source: string; id: string }[]
  >([]);
  const [inflowsArray, setInflowsArray] = useState<
    { source: string; id: string }[]
  >([]);
  const [outflowsArray, setOutflowsArray] = useState<
    { source: string; id: string }[]
  >([]);

  const [cashInArray, setCashInArray] = useState<number[]>([]);
  const [cashOutArray, setCashOutArray] = useState<number[]>([]);
  const [cashbox, setCashbox] = useState<number[]>([]);
  const [cumulativeCashArray, setCumulativeCashArray] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInflows = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/funds/inflows`
      );

      const { data } = await response.json();

      setInflowsArray(CropIdAndSource(data));

      const inflowObject: Inflows = ArrayToInflowObject(
        data
      ) as unknown as Inflows;

      setInflows(inflowObject);
    };

    const fetchOutflows = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/funds/outflows`
      );

      const { data } = await response.json();

      setOutflowsArray(CropIdAndSource(data));

      const outflowObject: Outflows = ArrayToOutflowObject(
        data
      ) as unknown as Outflows;

      setOutflows(outflowObject);
    };

    const fetchLiquidFunds = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/funds/liquidFunds`
      );

      const { data } = await response.json();

      setLiquidFundsArray(CropIdAndSource(data));

      const liquidFundsObject: LiquidFunds = ArrayToLiquidFundObject(
        data
      ) as unknown as LiquidFunds;

      setLiquidFunds(liquidFundsObject);
    };

    Promise.all([fetchLiquidFunds(), fetchInflows(), fetchOutflows()]).finally(
      () => setIsLoading(false)
    );
  }, []);

  const handleFundsChange = (changes: CellChange<TextCell>[]) => {
    changes.forEach((change) => {
      const fundIndex = change.rowId as string;
      const fieldName = change.columnId as string;

      if (fundIndex.startsWith("inflow")) {
        const inflowEntries = Object.entries(inflows);

        inflowEntries.forEach(([key, values]) => {
          const inflowFund = values.find(
            (item: CashFlowValue) =>
              fundIndex.includes(item.id) && fieldName.includes(item.month)
          );

          if (inflowFund) {
            const newValues = inflows[key as keyof Inflows].map(
              (item: CashFlowValue) => {
                if (item.id === fundIndex && item.month === fieldName) {
                  return { ...item, value: Number(change.newCell.text) };
                }
                return item;
              }
            );

            inflows[key as keyof Inflows] = newValues;

            const inflowAmountArray: number[] = newValues.map(
              (item) => item.value
            );

            const inflowSource = inflowsArray.find(
              (item) => item.source === key
            )?.id;

            //call an api
            const updateInflows = async () => {
              const updateResponse = await fetch(
                `${
                  import.meta.env.VITE_APP_API_URL
                }/funds/inflows/${inflowSource}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    amount: inflowAmountArray,
                  }),
                }
              );

              console.log(updateResponse);
            };

            updateInflows();
          }
        });

        setInflows({ ...inflows });
        console.log("InFlow", ":", inflows);
      } else if (fundIndex.startsWith("outflow")) {
        const outflowEntries = Object.entries(outflows);

        outflowEntries.forEach(([key, values]) => {
          const outflowFund = values.find(
            (item: CashFlowValue) =>
              fundIndex.includes(item.id) && fieldName.includes(item.month)
          );

          if (outflowFund) {
            const newValues = outflows[key as keyof Outflows].map(
              (item: CashFlowValue) => {
                if (item.id === fundIndex && item.month === fieldName) {
                  return { ...item, value: Number(change.newCell.text) };
                }
                return item;
              }
            );

            outflows[key as keyof Outflows] = newValues;

            const outflowAmountArray: number[] = newValues.map(
              (item) => item.value
            );

            const outflowSource = outflowsArray.find(
              (item) => item.source === key
            )?.id;

            //call an api
            const updateOutflows = async () => {
              const updateResponse = await fetch(
                `${
                  import.meta.env.VITE_APP_API_URL
                }/funds/inflows/${outflowSource}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    amount: outflowAmountArray,
                  }),
                }
              );

              console.log(updateResponse);
            };

            updateOutflows();
          }
        });

        setOutflows({ ...outflows });

        console.log("OutFlow", ":", outflows);
      } else {
        const liquidFundsEntries = Object.entries(liquidFunds);

        liquidFundsEntries.forEach(([key, values]) => {
          const liquidFund = values.find(
            (item: CashFlowValue) =>
              fundIndex.includes(item.id) && fieldName.includes(item.month)
          );

          if (liquidFund) {
            const newValues = liquidFunds[key as keyof typeof liquidFunds].map(
              (item: CashFlowValue) => {
                if (item.id === fundIndex && item.month === fieldName) {
                  return { ...item, value: Number(change.newCell.text) };
                }
                return item;
              }
            );

            liquidFunds[key as keyof typeof liquidFunds] = newValues;

            const LiquidFundAmountArray: number[] = newValues.map(
              (item) => item.value
            );

            const LiquidFundSource = liquidFundsArray.find(
              (item) => item.source === key
            )?.id;

            //call an api
            const updateLiquidFundflows = async () => {
              const updateResponse = await fetch(
                `${
                  import.meta.env.VITE_APP_API_URL
                }/funds/liquidFunds/${LiquidFundSource}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    balance: LiquidFundAmountArray,
                  }),
                }
              );

              console.log(updateResponse);
            };

            updateLiquidFundflows();
          }
        });

        setLiquidFunds({ ...liquidFunds });

        console.log("Cashbox/Bank", ":", liquidFunds);
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
        setCashOutArray,
        setCumulativeCashArray
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

  if (isLoading)
    return (
      <>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="size-20 rounded-full animate-spin bg-emerald-600 relative">
            <div className="size-[4.9rem] bg-white rounded-full text-xs absolute"></div>
          </div>
        </div>
        <div className="text-sm absolute inset-0 justify-center items-center flex font-bold tracking-tighter text-emerald-500">
          Loading..
        </div>
      </>
    );

  return (
    <>
      <Header />

      <main className="w-full overflow-x-auto">
        <CustomSelectHeader
          color={color}
          backgroundColor={backgroundColor}
          handleColor={handleColorChange}
          handleBackgroundColor={handleBackgroundColorChange}
        />
        <FinancialChart
          cashInArray={cashInArray}
          cashOutArray={cashOutArray}
          cashbox={cashbox}
          cumulativeCashArray={cumulativeCashArray}
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
