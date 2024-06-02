import dayjs from "dayjs";
import { useEffect, useState } from "react";

const DetailItem = ({
  title = "",
  value = "",
  isEditMode = false,
  isEditable = false,
  isDate = false,
  onChange,
}) => {
  const [dateValue, setDateValue] = useState(
    isDate && value ? dayjs(value).format("YYYY-MM-DD") : ""
  );

  useEffect(() => {
    if (!isDate || !value) return;
    setDateValue(value);
  }, [isDate, value]);

  function handleDateChange(e) {
    setDateValue(e.target.value);
    onChange(e.target.value);
  }

  function handleSpanChange(e) {
    onChange(e.currentTarget?.textContent);
  }
  return (
    <div
      className={`${
        isEditMode && !isEditable && "text-stone-300"
      } flex justify-between my-2`}
    >
      <span className="w min-w-[200px]">{title}:</span>
      {isDate ? (
        <input
          type="date"
          name=""
          value={dayjs(dateValue).format("YYYY-MM-DD")}
          onChange={handleDateChange}
          disabled={!isEditMode}
        />
      ) : (
        <span
          contentEditable={isEditMode && isEditable}
          className={`capitalize ${
            isEditable && isEditMode ? "border rounded-lg p-1" : "px-4 py-1"
          }`}
          onInput={handleSpanChange}
        >
          {value}
        </span>
      )}
    </div>
  );
};

export default DetailItem;
