import { db } from "../index.js";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

// GET Apis

export const insertJob = async (payload) => {
  const COLLECTION = process.env.MONGO_JOB_COLLECTION;

  const DB = process.env.MONGO_DB;

  const collection = client.db(DB).collection(COLLECTION);

  // //   // Execute the search query
  const result = await collection.insertOne(payload);
  return result.insertedId;
};

export const updateJob = async (req, res) => {
  const COLLECTION = process.env.MONGO_JOB_COLLECTION;
  const DB = process.env.MONGO_DB;
  const collection = client.db(DB).collection(COLLECTION);

  const {
    _id,
    title,
    status,
    startDate,
    expectedCompletionDate,
    actualCompletionDate,
    testedBy,
  } = req.body;
  const update = {
    $set: {
      title: title,
      status: status,
      startDate: startDate,
      expectedCompletionDate: expectedCompletionDate,
      actualCompletionDate: actualCompletionDate,
      testedBy: testedBy,
    },
  };

  const findNewlyCreatedSrQuery = { _id: new ObjectId(_id) };
  await collection.updateMany(
    findNewlyCreatedSrQuery,
    update,
    function (err, result) {
      if (err) {
        return;
      }
    }
  );
  res.send(
    JSON.stringify({
      id: _id,
    })
  );
};

export const getJobDetailsInternal = async (id) => {
  const COLLECTION = process.env.MONGO_JOB_COLLECTION;
  const DB = process.env.MONGO_DB;
  const collection = client.db(DB).collection(COLLECTION);

  let query = "";
  if (id) {
    query = { ["_id"]: new ObjectId(id) };
  }
  const result = await collection.find(query).toArray();
  return result;
};

export const getJobDetails = async (req, res) => {
  const id = (req.url && req.url.split("/")[1]) || null;
  const result = await getJobDetailsInternal(id);
  res.send(JSON.stringify(result));
};

export const getJobDetailsSql = (req, res) => {
  const jobId = req.query.id;
  const query = `SELECT * FROM job WHERE jobId = ?`;
  // const fquery = `SELECT task.taskId, test.name, task.taskStatus
  //     FROM job
  //     INNER JOIN task
  //     ON job.jobId = task.jobId
  //     INNER JOIN test
  //     ON test.testId = task.testId`;

  db.query(query, [jobId], (err, result) => {
    res.send(result);
  });

  // db.query(fetchQuery, (error, result) => {
  //     if (jobId === '0') res.send(result);
  //     const detailedResult = {};
  //     detailedResult.jobData = result;

  //     const taskFetcher = `SELECT * FROM task WHERE jobId = ${jobId}`;
  //     db.query(taskFetcher, (error, result) => {
  //         detailedResult.tasks = result;
  //         res.send(detailedResult);
  //     })
  // })
};

export const getJobsSql = (req, res) => {
  const query = "select * from job";
  db.query(query, (error, result) => {
    res.send(result);
  });
};

// export const getJobDetails = (req, res) => {
//     let fetchQuery = '';
//     const jobId = req.query.id;
//     if (jobId === '0') {
//         fetchQuery = "select * from job"
//     } else {
//         fetchQuery = `select * from job where jobId = ${jobId}`
//     }
//     db.query(fetchQuery, [jobId], (error, result) => {
//         console.log('error: ', error);
//         console.log('result: ', result);
//         res.send(result)
//     })
// }

// POST Apis
export const addJob = (req, res) => {
  const { stage, title, customerId } = req.body;
  const sqlInsert =
    "INSERT INTO job (stage, title, customerId) VALUES (?, ?, ?)";
  db.query(sqlInsert, [stage, title, customerId], (error, result) => {
    res.send(result);
  });
};
// export const updateJob = (req, res) => {
//   const sqlInsert =
//     "INSERT INTO job (jobId, stage, title, customerId) VALUES (1, 'Open', 'Soil testing at Bari Brahamna', 1)";
//   db.query(sqlInsert, (error, result) => {
//     console.log("error: ", error);
//     console.log("result: ", result);
//     res.send(result);
//   });
// };
export const deleteJob = (req, res) => {
  const jobId = req.query.id;
  const deleteQuery = "DELETE FROM job WHERE jobId=?";
  db.query(deleteQuery, [jobId], (error, result) => {
    res.send(result);
  });
};
