import React, { useEffect, useState } from "react";
import EquipmentSearch from "../Calibrations/EquipmentSearch";
import { columns } from "./constants";
import { downloadCurrentScreenData } from "../Calibrations/utils";
import useGetScopeData from "./service-hooks/useGetScopeData";
import ScopeTable from "./ScopeTable";
import DisciplineFilter from "./Filters/DisciplineFilter";
import GroupFilter from "./Filters/GroupFilter";
import MaterialFilter from "./Filters/MaterialFilter";

export default function StylingRowsGrid() {
  const [onScreenScope, setOnScreenScope] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filters, setFilters] = useState({
    discipline: "",
    group: "",
    material: "",
  });

  const { scopeData, getScopeData } = useGetScopeData({
    searchString: searchString,
    discipline: filters.discipline,
    group: filters.group,
    material: filters.material,
  });

  console.log("filters: ", filters);

  function handleDisciplineChange(newDiscipline) {
    const newFilters = {
      discipline: newDiscipline,
      group: "",
      material: "",
    };
    setFilters(newFilters);
    getScopeData({
      searchString: searchString,
      ...newFilters,
    });
  }

  function handleGroupChange(newGroup) {
    const newFilters = {
      ...filters,
      group: newGroup,
      material: "",
    };
    setFilters(newFilters);
    getScopeData({
      searchString,
      ...newFilters,
    });
  }

  function handleMaterialChange(newMaterial) {
    const newFilters = {
      ...filters,
      material: newMaterial,
    };
    setFilters(newFilters);
    getScopeData({
      searchString,
      ...newFilters,
    });
  }

  useEffect(() => {
    if (scopeData) {
      setOnScreenScope(scopeData);
    }
  }, [scopeData]);

  function handleSearch(searchQuery) {
    setSearchString(searchQuery);
    getScopeData({
      discipline: filters?.discipline,
      group: filters?.group,
      material: filters?.material,
      searchString: searchQuery,
    });
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
      <div className="flex">
        <DisciplineFilter onDisciplineChange={handleDisciplineChange} />
        <GroupFilter
          discipline={filters.discipline}
          onGroupChange={handleGroupChange}
        />
        <MaterialFilter
          discipline={filters.discipline}
          group={filters.group}
          onMaterialChange={handleMaterialChange}
        />
      </div>
      <ScopeTable columns={columns} rows={onScreenScope} />
    </div>
  );
}
