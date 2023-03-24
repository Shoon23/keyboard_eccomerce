import React from "react";
interface Props {
  percentage: number;
}
function PercentBar({ percentage }: Props) {
  return (
    <div className="w-full border border-black ">
      <div
        style={{ width: `${percentage}%` }}
        className={`h-full bg-sky-600 text-sky-600`}
      >
        .
      </div>
    </div>
  );
}

export default PercentBar;
