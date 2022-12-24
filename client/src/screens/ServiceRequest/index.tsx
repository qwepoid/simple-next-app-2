import { useRouter } from "next/router";

const ServiceRequest = () => {
  const router = useRouter();

  const handleNewServiceRequest = () => {
    router.push("/service-request/new");
  };
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
