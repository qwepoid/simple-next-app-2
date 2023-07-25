import { useState } from "react";

const Chip = ({
  items = [],
  showCount = false,
  multiSelect = false,
}: {
  items: {
    title: string;
    count?: number;
    handleClick: (idx: number) => void;
  }[];
  showCount?: boolean;
  multiSelect?: boolean;
}) => {
  const [currentSelection, setCurrentSelection] = useState(
    multiSelect ? [] : [0]
  );
  function handleChipClick(item, idx) {
    item.handleClick(idx);
    if (currentSelection.includes(idx)) {
      let final = currentSelection.filter((elem) => elem !== idx);
      setCurrentSelection(final);
    } else {
      if (!multiSelect) {
        setCurrentSelection([idx]);
      } else {
        setCurrentSelection((prevSelections) => [...prevSelections, idx]);
      }
    }
  }

  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      {items.map((item, idx) => (
        <div className="relative" key={idx}>
          <span
            className={`border rounded-2xl px-2 ${
              currentSelection.includes(idx)
                ? "bg-sky-300 hover:bg-sky-300 bg"
                : "bg-sky-100 hover:bg-sky-200"
            } cursor-pointer`}
            onClick={() => handleChipClick(item, idx)}
          >
            <span>{item.title}</span>
            {!!showCount && (
              <span className="text-sm ml-1 text-center align-text-top font-bold ">{`(${item.count})`}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Chip;
