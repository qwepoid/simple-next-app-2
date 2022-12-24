import { useRouter } from "next/router";
import React from "react";

const Quotations: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between">
        <h1>My Quotations</h1>
        <button onClick={() => router.push("quotations/addNew")}>
          Create new Quotation
        </button>
        {/* <Typography variant="h4">My Quotations</Typography> */}
      </div>
    </div>
  );
};

export default Quotations;
