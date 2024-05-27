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
import CustomLegend from "./custom-legend";
import CustomTick from "./custom-tick";

const data = [
  {
    name: "Jan",
    monthlyInflow: 0,
    monthlyOutflow: 800,
    cashbox_bank: 1400,
    credit_line_overdraft: 490,
  },
  {
    name: "Feb",
    monthlyInflow: 0,
    monthlyOutflow: 967,
    cashbox_bank: 1506,
    credit_line_overdraft: 590,
  },
  {
    name: "Mar",
    monthlyInflow: 0,
    monthlyOutflow: 1098,
    cashbox_bank: 989,
    credit_line_overdraft: 350,
  },
  {
    name: "Apr",
    monthlyInflow: 0,
    monthlyOutflow: 1200,
    cashbox_bank: 1228,
    credit_line_overdraft: 480,
  },
  {
    name: "May",
    monthlyInflow: 0,
    monthlyOutflow: 1108,
    cashbox_bank: 1100,
    credit_line_overdraft: 460,
  },
  {
    name: "Jun",
    monthlyInflow: 0,
    monthlyOutflow: 680,
    cashbox_bank: 1700,
    credit_line_overdraft: 380,
  },
  {
    name: "Jul",
    monthlyInflow: 0,
    monthlyOutflow: 790,
    cashbox_bank: 1500,
    credit_line_overdraft: 420,
  },
  {
    name: "Aug",
    monthlyInflow: 0,
    monthlyOutflow: 900,
    cashbox_bank: 1400,
    credit_line_overdraft: 560,
  },
  {
    name: "Sep",
    monthlyInflow: 0,
    monthlyOutflow: 680,
    cashbox_bank: 1700,
    credit_line_overdraft: 380,
  },
  {
    name: "Oct",
    monthlyInflow: 0,
    monthlyOutflow: 790,
    cashbox_bank: 1500,
    credit_line_overdraft: 420,
  },
  {
    name: "Nov",
    monthlyInflow: 0,
    monthlyOutflow: 900,
    cashbox_bank: 1400,
    credit_line_overdraft: 560,
  },
  {
    name: "Dec",
    monthlyInflow: 0,
    monthlyOutflow: 680.12,
    cashbox_bank: 1700,
    credit_line_overdraft: -380,
  },
];

const FinancialChart = ({
  cashInArray,
  cashOutArray,
  cashbox,
}: {
  cashInArray: Array<number>;
  cashOutArray: Array<number>;
  cashbox: Array<number>;
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
        credit_line_overdraft: Math.floor(Math.random() * 50000) + 1,
        cashbox_bank: Number(cashbox[index]),
      };
    });
  }, [cashInArray, cashOutArray, cashbox]);

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
