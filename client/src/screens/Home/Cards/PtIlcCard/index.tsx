const PtIlcCard = ({ handleClick }) => {
  return (
    <div
      className="border border-black rounded-xl flex flex-col p-2 cursor-pointer w-64"
      onClick={handleClick}
    >
      <div className="font- text-lg font-bold border-b border-b-black">
        PT and ILC
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex justify-between bg-red-500 rounded-lg text-white px-2">
          <span>Not Applied</span>
          <span>12</span>
        </div>
        <div className="flex justify-between px-2">
          <span>Results awaited</span>
          <span>7</span>
        </div>
        <div className="flex justify-between px-2">
          <span>Completed</span>
          <span>39</span>
        </div>
      </div>
    </div>
  );
};

export default PtIlcCard;
