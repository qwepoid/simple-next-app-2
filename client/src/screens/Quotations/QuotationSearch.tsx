import React from "react";
import SearchBar from "../../components/SearchBar";

const QuotationSearch = ({ handleSearch, currentQuery }) => {
  return (
    <SearchBar
      query={currentQuery}
      placeholder="Search Quotation by Subject, Client Name ..."
      onSeachChange={handleSearch}
      autofocus={true}
    />
  );
};

export default React.memo(QuotationSearch);
