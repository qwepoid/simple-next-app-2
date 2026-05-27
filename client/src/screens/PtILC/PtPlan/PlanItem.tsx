import React, { useState } from "react";
import RecordsPT from "../RecordsPT";

const PlanItem = ({ data, year }) => {
  const currentYearData = data.filter((record) =>
    record.dateOfPt.includes(year)
  );

  const [isOpen, setIsOpen] = useState(false);
  console.log("data: ", data);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h1
        onClick={toggleAccordion}
        style={{
          cursor: "pointer",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        {year} {isOpen ? "▲" : "▼"}
      </h1>

      {/* Collapsible Content */}
      {isOpen && (
        <div>
          {currentYearData.length ? (
            <RecordsPT records={currentYearData} />
          ) : (
            <span>No records found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PlanItem;
