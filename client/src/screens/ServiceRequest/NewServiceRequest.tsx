import { useRouter } from "next/router";

const NewServiceRequest = () => {
  const router = useRouter();
  const handleJobOrderCreation = () => {
    router.push("/job/new");
  };

  const handleJobOrderCancellation = () => {
    router.push("/");
  };
  return (
    <div>
      <div>
        <label htmlFor="client">Client</label>
        <input name="client" className="border mx-2" />
      </div>
      <div>
        <label htmlFor="sampleDescription">Sample Description</label>
        <input name="sampleDescription" className="border mx-2" />
      </div>
      <div>
        <label htmlFor="samplingLocation">Sampling Location</label>
        <input name="samplingLocation" className="border mx-2" />
      </div>
      <div>
        <label htmlFor="testParameters">Test Parameters</label>
        <select name="testParameters" className="border mx-2" multiple>
          <option>Acidity</option>
          <option>Alkalinity</option>
        </select>
      </div>
      <div>
        <label htmlFor="sampleQuantity">Sample Quantity</label>
        <input name="sampleQuantity" className="border mx-2" />
      </div>
      <div className="fixed bottom-20 flex w-full justify-around">
        <button
          onClick={handleJobOrderCreation}
          className="bg-blue-800 rounded-lg p-2 font-medium text-white"
        >
          Create Job Order
        </button>
        <button
          onClick={handleJobOrderCancellation}
          className="p-2 font-medium underline"
        >
          Save for later
        </button>
      </div>
    </div>
  );
};

export default NewServiceRequest;
