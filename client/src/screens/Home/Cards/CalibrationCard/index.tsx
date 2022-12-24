import { useRouter } from "next/router";
import { applicationRoutes } from "../../../../constants/applicationRoutes";

const CalibrationCard = ({
  data = { expired: "-", expiring30: "-", expiring60: "-" },
}) => {
  const router = useRouter();
  function handleClick(e: any): void {
    router.push({
      pathname: applicationRoutes.calibrations,
    });
  }

  return (
    <div
      className="border border-black rounded-xl flex flex-col p-2 cursor-pointer md:w-64 sm:w-72"
      onClick={handleClick}
    >
      <div className="font- text-lg font-bold border-b border-b-black">
        Calibration
      </div>
      <div className="flex flex-col mt-2">
        <div
          id="1"
          className="flex justify-between bg-red-500 rounded-lg text-white px-2"
        >
          <span>Expired</span>
          <span>{data?.expired}</span>
        </div>
        <div id="2" className="flex justify-between px-2">
          <span>Expiring in 30 days</span>
          <span>{data?.expiring30}</span>
        </div>
        <div id="3" className="flex justify-between px-2">
          <span>Expiring in 60 days</span>
          <span>{data?.expiring60}</span>
        </div>
      </div>
    </div>
  );
};

export default CalibrationCard;
