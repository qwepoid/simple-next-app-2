// import { firebase } from "../firebaseConfig";
import { app, database } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { getAllDocs1 } from "./src/services/firebase/firebaseUtils";
// import useGetCalibrationData from "./calibrations/service-hooks/useGetCalibrationData";

const About = () => {
  // const dbInstance = collection(database, "calibrations");

  // const whereQuery1 = async () => {
  //   const q = query(dbInstance, where("equipmentId", "==", "ERL/INS/022"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };

  // const whereQuery = () => {
  //   return getDocs(dbInstance).then((data) =>
  //     data.docs.map((doc) => {
  //       console.log(doc.data());
  //     })
  //   );
  // };

  // const { calibrationData, isCalibrationError, calibrationError } =
  //   useGetCalibrationData();
  // if (calibrationData) {
  //   console.log(calibrationData);
  // } else if (isCalibrationError) {
  //   console.log(calibrationError);
  // } else {
  //   console.log("nothing happenned here ===---");
  // }

  // //   const getCalibrationDetailsByEquipmentId = (equipmentId = "ERL/INS/01") => {
  // //     whereQuery("calibrations", "instrumentId", equipmentId)
  // //       .get()
  // //       .then((querySnapshot: any) => {
  // //         querySnapshot.forEach((doc: any) => {
  // //           console.log(doc.id, " => ", doc.data());
  // //         });
  // //       });
  // //   };
  // //   console.log("trying to get - ", getAllDocs1("calibrations"));
  return <div>On About page</div>;
};

export default About;
