import { db } from "../index.js";
import { client } from "../index.js";

// GET Apis
export const createQuotation = async (req, res) => {
  const COLLECTION = process.env.MONGO_QUOT_COLLECTION;
  const DB = process.env.MONGO_DB;

  const payload = req.body;
  const { quotationTo, subject, reference, dateOfQuotation, quotationItems } =
    payload;
  console.log("payload: ", payload);
  const collection = client.db(DB).collection(COLLECTION);
  const query = {
    quotationTo: quotationTo + "not me",
    subject,
    reference,
    dateOfQuotation,
    quotationItems,
  };

  // //   // Execute the search query
  const result = await collection.insertOne(query);
  res.send(JSON.stringify(1));
};

export const getQuotation = async (req, res) => {
  const COLLECTION = process.env.MONGO_QUOT_COLLECTION;
  const DB = process.env.MONGO_DB;
  const collection = client.db(DB).collection(COLLECTION);

  const result = await collection.find({}).toArray();
  res.send(JSON.stringify(result));
};
