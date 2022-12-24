import { useRouter } from "next/router";
import useAddJob from "./service-hooks/useAddJob";

const AddNewJob = () => {
  const router = useRouter();
  const { addData, addJob } = useAddJob();
  const handleCreateJob = () => {
    // do something
    // naviagte to all jobs
    addJob();
    router.replace("/job");
  };
  return (
    <div>
      <div>
        <label htmlFor="testname">TestName</label>
        <select name="testname" className="border mx-2">
          <option>Cube Testing</option>
          <option>Hello2</option>
        </select>
      </div>
      <div>
        <label htmlFor="client">Client</label>
        <input name="client" className="border mx-2" />
      </div>
      <div>
        <label htmlFor="dateReceived">Sample receiving date</label>
        <input name="dateReceived" className="border mx-2" type="date" />
      </div>
      <div>
        <label htmlFor="dateTestingStarted">Testing start date</label>
        <input name="dateTestingStarted" className="border mx-2" type="date" />
      </div>
      <div>
        <label htmlFor="dateExpectedCompletion">Expected completion date</label>
        <input
          name="dateExpectedCompletion"
          className="border mx-2"
          type="date"
        />
      </div>
      <button onClick={handleCreateJob}>Create</button>
    </div>
  );
};

export default AddNewJob;
