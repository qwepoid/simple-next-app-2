import { ObjectId } from "mongodb";
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

export const addRecord = async (req, res) => {
  const DB = process.env.MONGO_DB;
  try {
    const data = await client
      .db(DB)
      .collection("ptRecords")
      .insertOne(req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

export const deleteRecord = async (req, res) => {
  const DB = process.env.MONGO_DB;
  const id = req.body.id;
  try {
    const data = await client
      .db(DB)
      .collection("ptRecords")
      .deleteOne({ _id: new ObjectId(id) });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
