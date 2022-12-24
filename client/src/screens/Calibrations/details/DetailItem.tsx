import dayjs from "dayjs";
import { useEffect, useState } from "react";

const DetailItem = ({
  title = "",
  value = "",
  isEditMode = false,
  isEditable = false,
  isDate = false,
}) => {
  const [dateValue, setDateValue] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (isDate) {
      let [date, month, year] = value.split("-");
      let newValue = `${year}-${month}-${date}`;
      setDateValue(newValue);
    }
  }, [isDate, value]);

  function handleDateChange(e) {
    console.log(e.target.value);
    setDateValue(e.target.value);
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
          value={dateValue}
          onChange={handleDateChange}
          disabled={!isEditMode}
        />
      ) : (
        <span
          contentEditable={isEditMode && isEditable}
          className={`capitalize ${
            isEditable && isEditMode ? "border rounded-lg p-1" : "px-4 py-1"
          }`}
        >
          {value}
        </span>
      )}
    </div>
  );
};

export default DetailItem;
