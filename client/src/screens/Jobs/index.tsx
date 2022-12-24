import { useRouter } from "next/router";
import useShowSubHeader from "../../components/useShowSubHeader";
import useDeleteJob from "./service-hooks/useDeleteJob";
import useGetJobs from "./service-hooks/useGetJobs";

const Jobs = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetJobs();
  const { deletedData, deleteJob } = useDeleteJob();
  const handleNewJob = () => {
    router.push("/job/new");
  };

  const { subHeader } = useShowSubHeader({ showBackBtn: false });
  const showJobDetails = (id: number) => {
    router.push(`/job/${id}`);
  };

  const handleJobDeletion = (e: any, id: number) => {
    e.stopPropagation();
    console.log("jobid is:", id);
    deleteJob(id);
  };

  // Error
  if (isError) {
    return <div>Something went wrong!</div>;
  }
  // Data
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {subHeader}
      This will display jobs
      <div className="job-row flex-col md:flex">
        {data.map((job) => (
          <div
            className="card border-4 rounded-lg p-4 bg-gray-50 cursor-pointer"
            onClick={() => showJobDetails(job.jobId)}
          >
            <div className="flex w-full justify-between">
              <div>
                <span>{job.title}</span>
                <div>{job.stage}</div>
              </div>
              <button
                className="bg-gray-300 px-2 py-0 rounded-lg hover:scale-105"
                onClick={(e) => handleJobDeletion(e, job.jobId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNewJob}
        className="bg-red-500 fixed right-6 bottom-20 text-white rounded-full w-fit px-4 py-2 text-xl md:hidden"
      >
        +
      </button>
    </div>
  );
};

export default Jobs;
