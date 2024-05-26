import { Box } from "@mui/material";

type TCustomLegend = {
  color: string;
  value: string;
};

type CustomLegendProps = {
  payload?: TCustomLegend[];
  activeSeries: Array<string>;
  setActiveSeries: React.Dispatch<React.SetStateAction<Array<string>>>;
};

const CustomLegend: React.FC<CustomLegendProps> = ({
  payload,
  activeSeries,
  setActiveSeries,
}) => {
  const handleLegendClick = (dataKey: string) => {
  
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey));
    } else {
      setActiveSeries((prev) => [...prev, dataKey]);
    }
  };

  return (
    <ul className="flex gap-3 pb-4 justify-end">
      {payload?.map((entry: TCustomLegend, index: number) => {
       
        return (
          <li
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => handleLegendClick(entry.value as string)}
            key={index}
          >
            <Box
              className="h-4 w-12"
              sx={{
                backgroundColor: entry.color,
              }}
            />
            <span className="font-medium text-xs capitalize tracking-tight">
              {entry.value}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default CustomLegend;
