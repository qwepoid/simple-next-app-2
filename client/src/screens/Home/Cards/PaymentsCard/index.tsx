const PaymentsCard = ({ handleClick }) => {
  return (
    <div
      className="border border-black rounded-xl flex flex-col p-2 cursor-pointer w-64"
      onClick={handleClick}
    >
      <div className="font- text-lg font-bold border-b border-b-black">
        Payments
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span>No Payment</span>
          <span>12</span>
        </div>
        <div className="flex justify-between">
          <span>Partial Payment</span>
          <span>7</span>
        </div>
        <div className="flex justify-between">
          <span>Total Payment Pending</span>
          <span>39</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
