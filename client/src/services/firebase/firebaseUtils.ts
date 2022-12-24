import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { ConditionalTypeForDocs } from "./types";

export const getAllDocs = (collectionName: string) => {
  let dataList: any = []
  // console.log('inside here')  
  const dbInstance = collection(database, collectionName)
  return getDocs(dbInstance)
  // .then((data) => {
  //   data.docs.map((doc) => {
  //     console.log('jus before: ', doc.data())
  //     return doc.data()
  //   })
  // })
  // .then((data) => {
  //   // console.log('data: ', data) 
  //   data.docs.map((doc) => {
  //     dataList.push(doc.data())
  //     console.log('dataList: ', dataList)
  //   })
  // })
  console.log('final dataList: ', dataList)
  return dataList
}

export const getAllDocs1 = (collectionName: string) => {
  let dataList: any = []
  // console.log('inside here')  
  const dbInstance = collection(database, collectionName)
  return getDocs(dbInstance).then((data) => data.docs.map((doc) => {
    // console.log('jus before: ', doc.data())
    return doc.data()
  }))
  // .then((data) => {
  //   // console.log('data: ', data) 
  //   data.docs.map((doc) => {
  //     dataList.push(doc.data())
  //     console.log('dataList: ', dataList)
  //   })
  // })
  console.log('final dataList: ', dataList)
  return dataList
}

export const getConditionalDocs = async (collectionName: string, condition: ConditionalTypeForDocs) => {
    const {key, conditional, value} = condition
    const dbInstance = collection(database, collectionName);
    const q = query(dbInstance, where(key, conditional, value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
}

