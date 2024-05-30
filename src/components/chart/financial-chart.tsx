import { useState, useMemo, useCallback } from "react";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "./custom-tooltip";
import CustomLegend from "./custom-legend"
import CustomTick from "./custom-tick";

import { data } from "../../constants/index";

const FinancialChart = ({
  cashInArray,
  cashOutArray,
  cashbox,
  cumulativeCashArray,
}: {
  cashInArray: Array<number>;
  cashOutArray: Array<number>;
  cashbox: Array<number>;
  cumulativeCashArray: Array<number>;
}) => {
  const [activeSeries, setActiveSeries] = useState<Array<string>>([]);

  const [barHovered, setBarHovered] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => setBarHovered(true), []);
  const handleMouseLeave = useCallback(() => setBarHovered(false), []);

  const memoizedData = useMemo(() => {
    return data.map((item, index) => {
      return {
        ...item,
        monthlyInflow: cashInArray[index],
        monthlyOutflow: cashOutArray[index],
        credit_line_overdraft: cumulativeCashArray[index],
        cashbox_bank: Number(cashbox[index]),
      };
    });
  }, [cashInArray, cashOutArray, cashbox, cumulativeCashArray]);

  return (
    <div className=" h-[480px]">
      <ResponsiveContainer height="100%" width="100%" minWidth={2160}>
        <ComposedChart
          height={400}
          data={memoizedData}
          margin={{
            top: 20,
            right: 160,
            bottom: 20,
            left: 140,
          }}
        >
          <CartesianGrid stroke="rgb(100 116 139)" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            scale="band"
            tick={<CustomTick />}
            tickCount={12}
          />
          <YAxis tickCount={20} />
          <Tooltip
            active={barHovered}
            cursor={false}
            content={<CustomTooltip activeSeries={activeSeries} />}
          />
          <Legend
            align="right"
            verticalAlign="top"
            iconSize={10}
            content={
              <CustomLegend
                activeSeries={activeSeries}
                setActiveSeries={setActiveSeries}
              />
            }
          />

          <Bar
            hide={activeSeries.includes("monthlyInflow")}
            dataKey="monthlyInflow"
            barSize={30}
            fill="#00b853"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          <Bar
            hide={activeSeries.includes("monthlyOutflow")}
            dataKey="monthlyOutflow"
            barSize={30}
            fill="rgb(239 68 68)"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Line
            type="monotone"
            hide={activeSeries.includes("credit_line_overdraft")}
            dataKey="credit_line_overdraft"
            stroke="#ff7300"
            strokeWidth={4}
            dot={{ stroke: "red", strokeWidth: 6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Line
            type="linear"
            dataKey="cashbox_bank"
            hide={activeSeries.includes("cashbox_bank")}
            stroke="#8e24aa"
            strokeWidth={4}
            dot={{ stroke: "#8e24aa", strokeWidth: 6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;
