// import useGetGroupsList from "../Scope/service-hooks/useGetGroupsList";
// import useGetScopeData from "../Scope/service-hooks/useGetScopeData";

// const SectionWise = () => {
//   const {
//     data: chemicalGraoups,
//     isLoading: chemicalGroupsLoading,
//     error: chemicalGroupsError,
//   } = useGetGroupsList({ callByDefault: 1, discipline: "CHEMICAL" });

//   const {
//     data: mechanicalGroups,
//     isLoading: mechanicalGroupsLoading,
//     error: mechanicalGroupsError,
//   } = useGetGroupsList({ callByDefault: 1, discipline: "MECHANICAL" });

//   const {
//     data: ndtGroups,
//     isLoading: ndtGroupsLoading,
//     error: ndtGroupsError,
//   } = useGetGroupsList({ callByDefault: 1, discipline: "NON-DESTRUCTIVE" });

//   // const { scopeData, isScopeLoading } = useGetScopeData({});

//   // Mechanical
//   const mechScope = scopeData?.filter(
//     (item) => item.discipline === "MECHANICAL"
//   );
//   const mechScopeGroupsDetails = Object.groupBy(
//     mechScope || [],
//     ({ group }) => group
//   );
//   const mechScopeGroups = Object.keys(mechScopeGroupsDetails);

//   // Chemical
//   const chemScope = scopeData?.filter((item) => item.discipline === "CHEMICAL");
//   const chemScopeGroupsDetails = Object.groupBy(
//     chemScope || [],
//     ({ group }) => group
//   );
//   const chemScopeGroups = Object.keys(chemScopeGroupsDetails);

//   // NDT
//   const ndtScope = scopeData?.filter(
//     (item) => item.discipline === "NON-DESTRUCTIVE"
//   );
//   const ndtScopeGroupsDetails = Object.groupBy(
//     ndtScope || [],
//     ({ group }) => group
//   );
//   const ndtScopeGroups = Object.keys(ndtScopeGroupsDetails);

//   // // const mechScopeMaterials = Object.groupBy(mechScope, ({ group }) => group);

//   // const chemScope = scopeData?.filter((item) => item.discipline === "CHEMICAL");

//   // console.log("chemScope: ", chemScope);

//   // const result1 = Object.groupBy(chemScope || [], ({ group }) => group);
//   // console.log("result1: ", result1);
//   // // console.log("keys: ", result1.keys);
//   // console.log("keys: ", Object.keys(result1));

//   // const result2 = Object.groupBy(scopeData, ({ group }) => group);
//   // console.log("result2: ", result2);

//   // const result3 = Object.groupBy(scopeData, ({ material }) => material);
//   // console.log("result3: ", result3);

//   return (
//     <div className="flex flex-wrap w-100 col-span-4">
//       Discipline
//       <h1>Mechanical</h1>
//       <div className="flex flex-wrap">
//         {mechScopeGroups.map((group) => (
//           <>
//             <h1>{group}</h1>
//             <div className="flex flex-wrap">
//               {[
//                 ...new Set(
//                   mechScopeGroupsDetails[group].map(
//                     (item: { material: any }) => item.material
//                   )
//                 ),
//               ].map((item) => (
//                 <div className="ml-4 text-stone-600 border w-fit h-fit rounded-xl p-2">
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </>
//         ))}
//       </div>
//       <h1>Chemical</h1>
//       <div className="flex flex-wrap">
//         {chemScopeGroups.map((group) => (
//           <div>
//             <h1>{group}</h1>
//             <div className="flex flex-wrap">
//               {[
//                 ...new Set(
//                   chemScopeGroupsDetails[group].map(
//                     (item: { material: any }) => item.material
//                   )
//                 ),
//               ].map((item) => (
//                 <div className="ml-4 text-stone-600 border w-fit h-fit rounded-xl p-2">
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <h1>Non-Destructive</h1>
//       <div className="flex flex-wrap">
//         {ndtScopeGroups.map((group) => (
//           <div>
//             <h1>{group}</h1>
//             <div className="flex flex-wrap">
//               {[
//                 ...new Set(
//                   ndtScopeGroupsDetails[group].map(
//                     (item: { material: any }) => item.material
//                   )
//                 ),
//               ].map((item) => (
//                 <div className="ml-4 text-stone-600 border w-fit h-fit rounded-xl p-2">
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* {mechanicalGroups?.map((group) => (
//         <>
//           <div>{group}</div>
//           {scopeData?.map((item, index) => {
//             if (
//               index !== 0 &&
//               scopeData[index]?.material === scopeData[index - 1].material
//             )
//               return null;
//             else if (item.group === group && item.discipline === "MECHANICAL") {
//               return <div>{item.material}</div>;
//             }
//           })}
//         </>
//       ))} */}
//       {/* <div>Chemical</div>
//       {chemicalGroups?.map((group) => (
//         <div>{group}</div>
//       ))}
//       <div>Non-Destructive</div>
//       {ndtGroups?.map((group) => (
//         <div>{group}</div>
//       ))} */}
//     </div>
//   );
// };

// export default SectionWise;

const SectionWise = () => {
  return <></>;
};

export default SectionWise;


https://firebasestorage.googleapis.com/v0/b/engg-research-labs.appspot.com/o/pt%2FCIL%3APT-23M%3AC.AGG%3AB-01.pdf?alt=media&token=861483d6-5307-4ae7-b4f4-3026267aa907