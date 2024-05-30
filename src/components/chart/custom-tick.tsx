type CustomTickProps = {
  x?: number;
  y?: number;
  width?: number;
  payload?: {
    value: string;
  };
};

const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload }) => {
  return (
    <g>
      <text
        x={x as number + 50}
        y={y as number+ 12}
        width={24}
        height={24}
        viewBox="0 0 1024 1024"
        fill="#666"
        className="font-bold text-sm text-center"
      >
        {payload?.value}
      </text>
    </g>
  );
};

export default CustomTick;
