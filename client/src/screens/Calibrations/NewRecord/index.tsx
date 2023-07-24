const NewRecord = () => {
  return (
    <div className="mt-4">
      <form>
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:col-span-2 gap-4">
            <span className="mt-4 text-lg font-medium text-gray-500 list-item">
              Equipment Details
            </span>
            <input
              id="ename"
              className="outline-none border-2 rounded-lg p-2 w-96 lg:col-span-2"
              placeholder="Equipment Name"
            />
            <input
              id="ename"
              className="outline-none border-2 rounded-lg p-2 w-48"
              placeholder="Range of Testing"
            />
            <input
              id="ename"
              className="outline-none border-2 rounded-lg p-2 w-48"
              placeholder="Least Count"
            />
            <input
              id="ename"
              className="outline-none border-2 rounded-lg p-2 w-96"
              placeholder="Section"
            />
            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Calibration Details
            </span>
            <input
              id="ulr"
              className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
              placeholder="ULR Id"
            />
            <input
              id="ename"
              className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
              placeholder="Calibrating Agency"
            />
            <input
              id="ename"
              type="date"
              className="outline-none border-2 rounded-lg p-2 mr-2 w-48"
              placeholder="Enter Calibration from date"
            />
            <input
              id="ename"
              type="date"
              className="outline-none border-2 rounded-lg p-2 ml-2 w-48"
              placeholder="Enter Calibration to date"
            />
            <input type="file" />
            <button className="bg-blue-500 text-white p-2 rounded-lg col-span-2">
              Add equipment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRecord;
