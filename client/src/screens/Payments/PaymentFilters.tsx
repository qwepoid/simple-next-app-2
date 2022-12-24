const PaymentFilters = ({ currentSelection = 1, handleNewSelection }) => {
  return (
    <div className="flex gap-2 mb-4">
      <span
        className={`border rounded-2xl px-2 ${
          currentSelection === 0
            ? "bg-sky-300 hover:bg-sky-300 bg"
            : "bg-sky-100 hover:bg-sky-200"
        } cursor-pointer`}
        onClick={() => handleNewSelection(0)}
      >
        All
      </span>
      <span
        className={`border rounded-2xl px-2 ${
          currentSelection === 1
            ? "bg-sky-300 hover:bg-sky-300"
            : "bg-sky-100 hover:bg-sky-200"
        } cursor-pointer`}
        onClick={() => handleNewSelection(1)}
      >
        Pending
      </span>
      <span
        className={`border rounded-2xl px-2 ${
          currentSelection === 2
            ? "bg-sky-300 hover:bg-sky-300"
            : "bg-sky-100 hover:bg-sky-200"
        } cursor-pointer`}
        onClick={() => handleNewSelection(2)}
      >
        Completed
      </span>
    </div>
  );
};

export default PaymentFilters;
