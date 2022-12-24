import { useState, useRef } from "react";

const SearchBar = ({
  placeholder = "",
  onSeachChange,
  query = "",
  autofocus = false,
}) => {
  const [currentQuery, setCurrentQuery] = useState(query);
  const timeoutIdRef = useRef(null);

  const debounceSearch = (value) => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      onSeachChange(value);
    }, 500);
  };

  function handleSearchInput(query = "") {
    setCurrentQuery(query);
    debounceSearch(query);
  }

  return (
    <div className="relative">
      <input
        type="text"
        autoFocus={autofocus}
        className="border border-black rounded-2xl p-2 m-2 outline-none min-w-[600px]"
        placeholder={placeholder}
        value={currentQuery}
        onChange={(e) => handleSearchInput(e.target.value)}
      />
      <button
        className="absolute right-6 bottom-4 bg-gray-300 text-xs font-bold text-white rounded-full h-6 w-6"
        onClick={() => handleSearchInput()}
      >
        X
      </button>
    </div>
  );
};

export default SearchBar;
