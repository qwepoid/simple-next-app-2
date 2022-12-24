const ConsolidatedData = ({
  discipline,
  applied = 0,
  awaited = 0,
  total = 0,
}) => {
  return (
    <div className="border border-black rounded-xl flex flex-col p-2 cursor-pointer w-60">
      <div className="font- text-lg font-bold border-b border-b-black">
        {discipline}
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex justify-between bg-red-500 rounded-lg text-white px-1">
          <span>Applied Parameters</span>
          <span>{`${applied} / ${total}`}</span>
        </div>
        <div className="flex justify-between px-1">
          <span>Results awaited</span>
          <span>{`${awaited} / ${total}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ConsolidatedData;
