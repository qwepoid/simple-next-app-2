import dayjs from "dayjs";
import { useRouter } from "next/router";

const ServiceRequest = () => {
  const router = useRouter();

  const handleNewServiceRequest = () => {
    router.push("/service-request/new");
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1>My Quotations</h1>
        <button
          className="mt-16 bg-red-500 border border-red-500 rounded-lg p-1 px-2 text-white hover:scale-105"
          onClick={() => router.push("/quotations/addNew")}
        >
          + New
        </button>
      </div>
      {/* <div>
        <QuotationSearch
          handleSearch={(searchQuery) => setSearchString(searchQuery)}
          currentQuery={searchString}
        />
      </div> */}
      <div className="flex flex-col gap-2">
        {Array(5)
          .fill(null)
          ?.map((datum) => (
            <div
              className="flex rounded-md p-2  border border-blue-100 hover:bg-slate-50 cursor-pointer"
              onClick={() => router.push(`/service-request/new`)}
            >
              <div className="left flex-grow flex flex-col">
                <div>Client: {"qwdqwd"}</div>
                <div>
                  <span className="text-sm">Total </span>
                  <span className="text-xs">(Incl. GST): </span>
                  <span>250 crores</span>
                </div>
              </div>
              <div className="right min-w-[200px]">
                Date of Quotation: {dayjs("11-11-2023").format("MMM DD, YYYY")}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
  return <div>Hell oservice requests</div>;
  return (
    <button
      onClick={handleNewServiceRequest}
      className="bg-red-500 fixed right-6 bottom-20 text-white rounded-full w-fit px-4 py-2 text-xl md:hidden"
    >
      +
    </button>
  );
};

export default ServiceRequest;
