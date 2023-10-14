import { client } from "../index.js";
import { ObjectId } from "mongodb";
import { insertJob, getJobDetailsInternal } from "./job.js";

export const createServiceRequest = async (req, res) => {
  const COLLECTION = process.env.MONGO_SR_COLLECTION;
  const DB = process.env.MONGO_DB;

  const payload = req.body;
  const { title, customerDetails, sampleDetails, dateOfSR } = payload;
  const collection = client.db(DB).collection(COLLECTION);
  const query = {
    title,
    customerDetails,
    sampleDetails,
    dateOfSR,
    createdAt: new Date(),
    udpdatedAt: new Date(),
  };

  // //   // Execute the search query
  const result = await collection.insertOne(query);
  const newSrId = result.insertedId;

  const jobIds = [];
  for (const sd of sampleDetails) {
    for (const tp of sd.testParameters) {
      const jobQuery = {
        title: "",
        material: sd.sampleDescription,
        serviceRequestId: newSrId,
        testParameter: tp.parameter,
        testMethod: tp.code,
        status: 0,
        startDate: "",
        expectedCompletionDate: "",
        actualCompletionDate: "",
        testedBy: "",
      };
      const jobCreateResult = await insertJob(jobQuery);
      const jobId = jobCreateResult;
      jobIds.push(jobId);
    }
  }

  const findNewlyCreatedSrQuery = { _id: newSrId }; // Replace with your specific query

  // Define the update operation to add a new key
  const update = { $set: { jobIds: jobIds } };

  // Perform the update
  await collection.updateOne(
    findNewlyCreatedSrQuery,
    update,
    function (err, result) {
      if (err) {
        return;
      }
    }
  );
  // const result = await collection.insertOne(query);
  res.send(
    JSON.stringify({
      id: newSrId,
    })
  );
};

export const updateServiceRequest = async (req, res) => {
  const COLLECTION = process.env.MONGO_SR_COLLECTION;
  const DB = process.env.MONGO_DB;

  const updateData = req.body;
  const documentId = req.body._id;
  delete updateData._id;
  const collection = client.db(DB).collection(COLLECTION);
  const newUpdatedData = {
    ...updateData,
    updatedAt: new Date(),
  };
  try {
    const filter = { _id: new ObjectId(documentId) };
    const updateOperation = {
      $set: newUpdatedData,
    };
    await collection.updateOne(filter, updateOperation);

    await updateJobs(newUpdatedData);

    // if (result.modifiedCount > 0) {
    res.json({ message: "Document updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const updateServiceRequest = async (req, res) => {
//   const COLLECTION = process.env.MONGO_SR_COLLECTION;
//   const DB = process.env.MONGO_DB;

//   const payload = req.body;
//   const { title, customerDetails, sampleDetails, dateOfSR } = payload;
//   const collection = client.db(DB).collection(COLLECTION);
//   const query = {
//     title,
//     customerDetails,
//     sampleDetails,
//     dateOfSR,
//     createdAt: new Date(),
//     udpdatedAt: new Date(),
//   };

//   // //   // Execute the search query
//   const result = await collection.insertOne(query);
//   const newSrId = result.insertedId;

//   const jobIds = [];
//   for (const sd of sampleDetails) {
//     for (const tp of sd.testParameters) {
//       const jobQuery = {
//         title: "",
//         serviceRequestId: newSrId,
//         material: sd.sampleDescription,
//         parameter: tp,
//       };
//       const jobCreateResult = await insertJob(jobQuery);
//       console.log("jobCreateResult in sr: ", jobCreateResult);
//       const jobId = jobCreateResult;
//       jobIds.push(jobId);
//     }
//   }

//   const findNewlyCreatedSrQuery = { _id: newSrId }; // Replace with your specific query

//   // Define the update operation to add a new key
//   const update = { $set: { jobIds: jobIds } };

//   console.log("new jobIds: ", jobIds);

//   // Perform the update
//   await collection.updateOne(
//     findNewlyCreatedSrQuery,
//     update,
//     function (err, result) {
//       if (err) {
//         console.error("Error updating document:", err);
//         return;
//       }

//       console.log("Document updated successfully");
//     }
//   );
//   // const result = await collection.insertOne(query);
//   res.send(
//     JSON.stringify({
//       id: newSrId,
//     })
//   );
// };

export const getServiceRequest = async (req, res) => {
  const searchString = req.query.q;

  const COLLECTION = process.env.MONGO_SR_COLLECTION;
  const DB = process.env.MONGO_DB;
  const collection = client.db(DB).collection(COLLECTION);

  let query = searchString
    ? {
        $or: [
          { customerDetails: { $regex: searchString, $options: "i" } },
          { subject: { $regex: searchString, $options: "i" } },
          { reference: { $regex: searchString, $options: "i" } },
        ],
      }
    : {};

  const id = (req.url && req.url.split("/")[1]) || null;
  if (!searchString && id) {
    query = { ["_id"]: new ObjectId(id) };
  }

  const result = await collection.find(query).sort({ dateOfSR: -1 }).toArray();

  /** Filter out only relevant info when printing list. */
  const updatedList = id
    ? await getSrWithJobStatus(result)
    : await getCondensedSrList(result);
  res.send(JSON.stringify(updatedList));
  // if (!id) {
  //   const updatedList = await getCondensedSrList(result);
  //   res.send(JSON.stringify(updatedList));
  // } else {
  //   const updatedList = await getSrWithJobStatus(result);
  //   res.send(JSON.stringify(updatedList));
  // }
};

async function getCondensedSrList(result) {
  let progressresult = [];
  for (const sr of result) {
    let progress = {
      notStarted: 0,
      inProgress: 0,
      completed: 0,
    };
    for (const job of sr.jobIds) {
      const jobDetails = await getJobDetailsInternal(job);

      if (jobDetails[0].status == 0) {
        progress.notStarted++;
      } else if (jobDetails[0].status == 1) {
        progress.inProgress++;
      } else if (jobDetails[0].status == 2) {
        progress.completed++;
      }
    }
    progressresult.push(progress);
  }
  const updatedResult = await result.map((sr, idx) => {
    const { title, customerDetails, dateOfSR, _id } = sr;
    return {
      title,
      dateOfSR,
      srId: _id,
      client: customerDetails.customerNameAddress,
      progress: progressresult[idx],
    };
  });
  return updatedResult;
}

async function getSrWithJobStatus(result) {
  let progressresult = [];
  for (const sr of result) {
    for (const job of sr.jobIds) {
      const jobDetails = await getJobDetailsInternal(job);
      progressresult.push(jobDetails[0].status);
    }
  }
  return await result.map((sr) => {
    const jobIdsUpdated = sr.jobIds.map((jobId, idx) => {
      return {
        id: jobId,
        status: progressresult[idx],
      };
    });
    return {
      ...sr,
      jobIds: jobIdsUpdated,
    };
  });
}
