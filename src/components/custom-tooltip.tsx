const CustomTooltip = ({
  active,
  payload,
  label,
  activeSeries,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }> | null;
  label?: string;
  activeSeries?: string[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex p-2 rounded-md bg-black/80 text-sm gap-2 flex-col text-white">
        <p className="uppercase tracking-tight">
          <strong>{label}</strong>
        </p>
        {payload.map((bar) => 
          !activeSeries?.includes(bar.name) && (
            <div className="flex gap-2 items-center" key={bar.name}>
              <span
                className={`size-2`}
                style={{ backgroundColor: bar.color }}
              />
              <span className="font-medium text-zinc-200/90 tracking-tight ">
                {bar.name} :
              </span>
              <span className="tracking-tighter font-regular text-xs">
                {bar.value}
              </span>
            </div>
          )
        )}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;