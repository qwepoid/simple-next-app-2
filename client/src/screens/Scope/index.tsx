import React, { useEffect, useState } from "react";
import EquipmentSearch from "../Calibrations/EquipmentSearch";
import { columns } from "./constants";
import { downloadCurrentScreenData } from "../Calibrations/utils";
import useGetScopeData from "./service-hooks/useGetScopeData";
import ScopeTable from "./ScopeTable";

export default function StylingRowsGrid() {
  const [onScreenScope, setOnScreenScope] = useState([]);
  const [searchString, setSearchString] = useState("");
  const { scopeData } = useGetScopeData({ searchString });

  useEffect(() => {
    if (scopeData) {
      setOnScreenScope(scopeData);
    }
  }, [scopeData]);

  function handleSearch(searchQuery) {
    setSearchString(searchQuery);
  }

  return (
    <div className="flex flex-col justify-start items-start h-full">
      <div className="flex w-full justify-between items-center">
        <EquipmentSearch
          currentQuery={searchString}
          handleSearch={handleSearch}
        />
        <button
          className="border p-1 h-fit rounded-lg bg-blue-400 text-white"
          onClick={() => downloadCurrentScreenData(onScreenScope)}
        >
          Download Screen Data
        </button>
      </div>
      <ScopeTable columns={columns} rows={onScreenScope} />
    </div>
  );
}
