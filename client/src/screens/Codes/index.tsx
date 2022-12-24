import CodesTable from "./CodesTable";

const Codes = () => {
  return (
    <div>
      <div className="flex">
        <input
          className="border-b mb-4 w-1/3 p-2 focus:border-blue-500 focus:border-b-2 outline-none"
          placeholder="Enter Material / Paramter / Code"
        />
      </div>
      <CodesTable />
    </div>
  );
};

export default Codes;
