import { client } from "../index.js";

// GET Apis
export const getRecords = async (req, res) => {
  const DB = process.env.MONGO_DB;

  const data = await client
    .db(process.env.MONGO_DB)
    .collection("ptRecords")
    .find({})
    .toArray();
  res.send(JSON.stringify(data));
};
