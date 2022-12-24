import { useState } from "react";

const Chip = ({
  items,
}: {
  items: {
    title: string;
    count: number;
    handleClick: (idx: number) => void;
  }[];
}) => {
  const [currentSelection, setCurrentSelection] = useState(0);
  return (
    <div className="flex gap-4 mb-4">
      {items.map((item, idx) => (
        <div className="relative" key={idx}>
          <span
            className={`border rounded-2xl px-2 ${
              currentSelection === idx
                ? "bg-sky-300 hover:bg-sky-300 bg"
                : "bg-sky-100 hover:bg-sky-200"
            } cursor-pointer`}
            onClick={() => {
              item.handleClick(idx);
              setCurrentSelection(idx);
            }}
          >
            <span>{item.title}</span>
            <span className="text-sm ml-1 text-center align-text-top font-bold ">{`(${item.count})`}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Chip;
