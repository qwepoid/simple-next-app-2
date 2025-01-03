import { useEffect, useState } from "react";

const Dropdown = ({
  options,
  selectedValue,
  placeholder,
  onSelectionChange,
}) => {
  const [currentSelection, setCurrentSelection] = useState("");

  useEffect(() => {
    setCurrentSelection(selectedValue);
  }, [selectedValue]);

  function handleChange(e) {
    // console.log("value1", e.target.value);
    onSelectionChange(e.target.value);
  }

  return (
    <select
      placeholder={placeholder}
      value={currentSelection}
      onChange={(value) => handleChange(value)}
    >
      <option value="">{placeholder}</option>
      {options?.map((item) => (
        <option value={item.value}>{item.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
