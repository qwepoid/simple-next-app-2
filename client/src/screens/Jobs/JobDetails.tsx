import { useRouter } from "next/router";
import useShowSubHeader from "../../components/useShowSubHeader";
import useGetJobDetails from "./service-hooks/useGetJobDetails";
import useGetJobs from "./service-hooks/useGetJobs";

const JobDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const customElement = (
    <button onClick={() => alert("Hello")}>Click me</button>
  );
  const { subHeader } = useShowSubHeader({
    showBackBtn: true,
    showCustomElement: customElement,
  });
  const { data, isLoading } = useGetJobDetails(Number(id));
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {subHeader}
      <div>{data.title}</div>
      {data.title || "hello"}
      Show Details{JSON.stringify(data)}
    </div>
  );
};

export default JobDetails;
