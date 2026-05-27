import useGetPtRecords from "../service-hooks/useGetPtRecords";
import PlanItem from "./PlanItem";

const PtPlan = () => {
  const { data, isLoading, error } = useGetPtRecords();

  const currentYear = new Date().getFullYear();

  if (!data) {
    return <></>;
  }

  const currentYearData = data.filter((record) =>
    record.dateOfPt.includes(currentYear)
  );

  //   for (let i = 0; i < 5; i++) {
  // return <PlanItem data={data} year={currentYear - i} />;
  //   }

  //   return (
  //     for (let i = 0; i < 5; i++) {
  //     <PlanItem data={data} year={currentYear - i} />;
  //   }
  //   )
  //     new Array(5).map((item) => {
  //       <PlanItem data={currentYearData} year={currentYear} />
  //     });

  //   return <PlanItem data={currentYearData} year={currentYear} />;
  return (
    <>
      <PlanItem data={data} year="2025" />
      <PlanItem data={data} year="2024" />
      <PlanItem data={data} year="2023" />
      <PlanItem data={data} year="2022" />
      <PlanItem data={data} year="2021" />
      <PlanItem data={data} year="2020" />
    </>
  );
};

export default PtPlan;
