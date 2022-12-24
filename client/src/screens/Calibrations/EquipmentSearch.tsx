import React from "react";
import SearchBar from "../../components/SearchBar";

const EquipmentSearch = ({ handleSearch, currentQuery }) => {
  return (
    <SearchBar
      query={currentQuery}
      placeholder="Search for Equipments"
      onSeachChange={handleSearch}
      autofocus={true}
    />
  );
};

export default React.memo(EquipmentSearch);
