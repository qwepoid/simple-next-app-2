import { useState } from "react";
import PaymentFilters from "./PaymentFilters";

const Payments = () => {
  const [selectedFilter, setSelectedFilter] = useState(1);

  function updateFilter(filterOn: number) {
    setSelectedFilter(filterOn);
  }
  return (
    <div>
      <PaymentFilters
        handleNewSelection={updateFilter}
        currentSelection={selectedFilter}
      />
      <table>
        <tr>
          <th className="border p-2">S.No.</th>
          <th className="border p-2">Work Name</th>
          <th className="border p-2">Client</th>
          <th className="border p-2">Bill Date</th>
          <th className="border p-2">Payment Status</th>
        </tr>
        <tr>
          <td className="border p-2">1</td>
          <td className="border p-2">KPTM Soil Test Ramban</td>
          <td className="border p-2">KPTL</td>
          <td className="border p-2">11-02-2022</td>
          <td className="border p-2 bg-yellow-400">Partial Payment Recevied</td>
        </tr>
      </table>
    </div>
  );
};

export default Payments;
