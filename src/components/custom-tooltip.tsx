const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }> | null;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const colors = ['green-500', 'red-500', 'orange-500', 'violet-500'];
    const labels = ['Monthly Inflow', 'Monthly Outflow', 'Credit Line Overdraft', 'Cashbox/bank'];

    return (
      <div className="flex p-2 rounded-md bg-black/80 text-sm gap-2 flex-col text-white">
        <p className="uppercase tracking-tight">
          <strong>{label}</strong>
        </p>
        {payload.map((item, index) => item?.value && (
          <div className="flex gap-2 items-center" key={index}>
            <span className={`size-2 bg-${colors[index]}`}/>
            <span className="font-medium text-zinc-200/90 tracking-tight ">
              {labels[index]} :
            </span>
            <span className="tracking-tighter font-regular text-xs">
              {" "}{item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;