import { client } from "../index.js";

function getPipeline(days = 0) {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  const defaultField = {
    formattedDate: {
      $cond: {
        if: { $eq: ["$calibrationTo", ""] },
        then: null, // or any default value you prefer
        else: "$calibrationTo",
      },
    },
  };

  const matchField =
    days === 0
      ? { $lt: today }
      : {
          $gt: today,
          $lt: futureDate,
        };
  return [
    {
      $addFields: defaultField,
    },
    {
      $match: {
        formattedDate: matchField,
      },
    },
  ];
}

export const getDashboardData = async (req, res) => {
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;

  const JOB_COLLECTION = "job";
  const notStartedQuery = { status: { $in: [0, "0"] } };
  const inProgressQuery = { status: { $in: [1, "1"] } };
  const onHoldQuery = { status: { $in: [2, "2"] } };

  const notStartedCount = await client
    .db(DB)
    .collection(JOB_COLLECTION)
    .countDocuments(notStartedQuery);

  const inProgressCount = await client
    .db(DB)
    .collection(JOB_COLLECTION)
    .countDocuments(inProgressQuery);

  const onHoldCount = await client
    .db(DB)
    .collection(JOB_COLLECTION)
    .countDocuments(onHoldQuery);

  const pipeline = getPipeline();
  const pipeline30 = getPipeline(30);
  const pipeline60 = getPipeline(60);
  const expiredData = await client
    .db(DB)
    .collection(COLLECTION)
    .aggregate(pipeline)
    .toArray();
  const expiringData30 = await client
    .db(DB)
    .collection(COLLECTION)
    .aggregate(pipeline30)
    .toArray();
  const expiringData60 = await client
    .db(DB)
    .collection(COLLECTION)
    .aggregate(pipeline60)
    .toArray();

  res.send(
    JSON.stringify({
      calibrations: {
        expired: expiredData.length,
        expiring30: expiringData30.length,
        expiring60: expiringData60.length,
      },
      works: {
        notStarted: notStartedCount,
        inProgress: inProgressCount,
        onHold: onHoldCount,
      },
    })
  );
};
