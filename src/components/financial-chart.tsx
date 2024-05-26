import { Box } from "@mui/material";
import { useState } from "react";
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
  cashbox: Array<string>;
}) => {
  const [activeSeries, setActiveSeries] = useState<Array<string>>([]);

  // Get all the 'name' values from the data for the XAxis ticks
  //   const xTicks = data.map((item) => item.name);

  data.forEach(
    (
      item: {
        monthlyInflow: number;
        monthlyOutflow: number;
        credit_line_overdraft: number;
        cashbox_bank: number;
      },
      index: number
    ) => {
      item.monthlyInflow = cashInArray[index];
      item.monthlyOutflow = cashOutArray[index];
      item.credit_line_overdraft = Math.floor(Math.random() * 50000) + 1;
      item.cashbox_bank = Number(cashbox[index]);

      console.log(cashbox[index]);

      return item;
    }
  );

  return (
    <Box
      sx={{
        height: "480px",
      }}
    >
      <div style={{ width: "100%", height: "100%", overflowX: "auto" }}>
        <ResponsiveContainer height="100%" className="w-full overflow-x-scroll">
          <ComposedChart
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
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
            <Tooltip content={<CustomTooltip />} />
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
              onMouseOver={(e) => {
                console.log(e);
              }}
            />

            <Bar
              hide={activeSeries.includes("monthlyOutflow")}
              dataKey="monthlyOutflow"
              barSize={30}
              fill="rgb(239 68 68)"
            />
            <Line
              type="monotone"
              hide={activeSeries.includes("credit_line_overdraft")}
              dataKey="credit_line_overdraft"
              stroke="#ff7300"
              strokeWidth={3}
              dot={{ stroke: "red", strokeWidth: 2 }}
            />
            <Line
              type="linear"
              dataKey="cashbox_bank"
              hide={activeSeries.includes("cashbox_bank")}
              stroke="#8e24aa"
              strokeWidth={2}
              dot={{ stroke: "#8e24aa", strokeWidth: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default FinancialChart;
