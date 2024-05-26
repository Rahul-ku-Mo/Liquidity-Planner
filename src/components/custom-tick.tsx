import { useEffect, useRef, useState } from "react";

type CustomTickProps = {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
};

const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload }) => {
  const textRef = useRef(null);
  const [dx, setDx] = useState(40);

  useEffect(() => {
    const handleResize = () => {
      setDx(window.innerWidth < 768 ? 50 : 20);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        ref={textRef}
        dy={16}
        dx={dx}
        fill="#666"
        textAnchor="middle"
        className="w-full font-bold text-center"
      >
        {payload?.value}
      </text>
    </g>
  );
};

export default CustomTick;
