import React from "react";
interface GridSwitchProps {
  // Add your props here
  gridCount: number;
  selectedGrid: number;
  clickHandler: (gridNumber: number) => void;
}

export const GridSwitch: React.FC<GridSwitchProps> = ({
  gridCount,
  selectedGrid,
  clickHandler
}) => {
  // Add your component logic here
  return (
    <button className={`flex mx-1`} onClick={() => clickHandler(gridCount)}>
      {Array.from({ length: gridCount }).map((_, index) => (
        <span
          key={index}
          className={`w-1 h-4 bg-gray-300 block mx-[1px] ${
            gridCount === selectedGrid ? "bg-gray-400" : ""
          }`}
        ></span>
      ))}
    </button>
  );
};
