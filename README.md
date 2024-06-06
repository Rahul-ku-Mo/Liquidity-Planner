# Liquidity Planner using React, React-Grid, Recharts, Material-UI and TailwindCSS.

This project is a financial application built with React and TypeScript. It provides a visual representation of liquid funds, inflows, and outflows. It also allows users to interact with the data and see the changes reflected in real-time in the graphs.

## Features

- **Liquid Funds**: This feature allows users to view and interact with their liquid funds. The data is fetched using the `getLiquidFunds` function.
- **Inflows**: This feature provides users with a view of their inflows. The data is fetched using the `getInflows` function.
- **Outflows**: This feature allows users to view and interact with their outflows. The data is fetched using the `getOutflows` function.
- **Cash Flow**: This feature provides users with a view of their cash inflows and outflows. The data is managed using the `cashInArray`, `cashOutArray`, `cashbox`, and `cumulativeCashArray` state variables.
- **Interactive Grid**: This feature provides an interactive grid for users to view and interact with their financial data. The grid is generated using the `getRows` and `getColumns` functions.

## Components

| Component | Description |
| --- | --- |
| `FinancialChart` | This component displays the financial data in a chart format. |
| `CustomHeader` | This component provides a custom header for the chart. |
| `CustomSelectHeader` | This component provides a custom select header for the chart. |

## Types and Interfaces

| Type/Interface | Description |
| --- | --- |
| `LiquidFunds` | This type represents the structure of the liquid funds data. |
| `Inflows` | This type represents the structure of the inflows data. |
| `Outflows` | This type represents the structure of the outflows data. |
| `CashFlowValue` | This type represents the structure of the cash flow data. |
| `Color` | This type represents the text color of header data. |
| `BackgroundColor` | This type represents the background color of header data. |

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/Rahul-ku-Mo/Liquidity-Planner
yarn
```

Then, start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.


