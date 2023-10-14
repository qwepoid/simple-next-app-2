import dayjs from "dayjs";
import { useRouter } from "next/router";
import useGetServiceRequests from "./custom-hooks/useGetServiceRequests";
import { useEffect, useState } from "react";

const ServiceRequest = () => {
  const router = useRouter();

  const [searchString, setSearchString] = useState("");
  const [onScreenSRs, setOnScreenSRs] = useState([]);
  const { data, isLoading, error, getServiceRequests } =
    useGetServiceRequests(1);

  useEffect(() => {
    if (data) {
      setOnScreenSRs(data);
    }
  }, [data]);

  useEffect(() => {
    getServiceRequests({ searchString });
  }, [searchString]);

  return (
    <div>
      <div className="flex justify-between">
        <h1>Service Requests</h1>
        <button
          className="mt-16 bg-red-500 border border-red-500 rounded-lg p-1 px-2 text-white hover:scale-105"
          onClick={() => router.push("/service-request/new")}
        >
          + New
        </button>
      </div>

      <div>
        <div> New Added today:</div>
      </div>
      <div>Existing SRs</div>
      <div className="flex flex-col gap-2">
        {onScreenSRs?.map((datum) => {
          const { srId, client, dateOfSR, progress } = datum;
          const { notStarted, inProgress, completed } = progress;
          return (
            <div
              className="flex rounded-md p-2  border border-blue-100 hover:bg-slate-50 cursor-pointer"
              onClick={() => router.push(`/service-request/${srId}`)}
            >
              <div className="left flex-grow flex flex-col">
                <div>
                  <span className="font-bold mr-2">Client:</span>
                  {client}
                </div>
                <div className="flex gap-4">
                  <span>{`Not Started: ${notStarted}`}</span>
                  <span>{`In Progress: ${inProgress}`}</span>
                  <span>{`Completed: ${completed}`}</span>
                </div>
              </div>
              <div className="right min-w-[200px]">
                <span className="font-bold mr-2">Date of Sample Receipt:</span>
                {dayjs(dateOfSR).format("MMM DD, YYYY")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceRequest;
