import { db } from "../index.js";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

// GET Apis
export const createQuotation = async (req, res) => {
  const COLLECTION = process.env.MONGO_QUOT_COLLECTION;
  const DB = process.env.MONGO_DB;

  const payload = req.body;
  const { quotationTo, subject, reference, dateOfQuotation, quotationItems } =
    payload;
  const collection = client.db(DB).collection(COLLECTION);
  const query = {
    title,
    quotationTo: quotationTo,
    subject,
    reference,
    dateOfQuotation,
    quotationItems,
    createdAt: new Date(),
    udpdatedAt: new Date(),
  };

  // //   // Execute the search query
  const result = await collection.insertOne(query);
  res.send(
    JSON.stringify({
      id: result.insertedId,
    })
  );
};

export const updateQuotation = async (req, res) => {
  const COLLECTION = process.env.MONGO_QUOT_COLLECTION;
  const DB = process.env.MONGO_DB;

  const updateData = req.body;
  const documentId = req.body._id;
  console.log("before", updateData);
  delete updateData._id;
  console.log("after", updateData);
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
    const result = await collection.updateOne(filter, updateOperation);

    // if (result.modifiedCount > 0) {
    res.json({ message: "Document updated successfully" });
    // } else {
    //   res.status(404).json({ message: "Document not found" });
    // }
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getQuotation = async (req, res) => {
  const searchString = req.query.q;

  const COLLECTION = process.env.MONGO_QUOT_COLLECTION;
  const DB = process.env.MONGO_DB;
  const collection = client.db(DB).collection(COLLECTION);

  let query = searchString
    ? {
        $or: [
          { quotationTo: { $regex: searchString, $options: "i" } },
          { subject: { $regex: searchString, $options: "i" } },
          { reference: { $regex: searchString, $options: "i" } },
        ],
      }
    : {};

  const id = (req.url && req.url.split("/")[1]) || null;
  if (!searchString && id) {
    query = { ["_id"]: new ObjectId(id) };
  }

  const options = {
    sort: { title: -1 }, // 1 for ascending, -1 for descending
  };

  const result = await collection
    .find(query)
    .sort({ dateOfQuotation: -1 })
    .toArray();
  res.send(JSON.stringify(result));
};

export const getQuotationsList = async (req, res) => {
  const searchString = req.query.q;

  const COLLECTION = process.env.MONGO_QUOT_COLLECTION;
  const DB = process.env.MONGO_DB;
  const collection = client.db(DB).collection(COLLECTION);

  let query = searchString
    ? {
        $or: [
          { quotationTo: { $regex: searchString, $options: "i" } },
          { subject: { $regex: searchString, $options: "i" } },
          { reference: { $regex: searchString, $options: "i" } },
        ],
      }
    : {};

  const options = {
    sort: { createdAt: 1 }, // 1 for ascending, -1 for descending
  };

  const result = await collection.find(query).toArray();
  res.send(JSON.stringify(result));
};

export const deleteQuotation = async (req, res) => {
  const COLLECTION = process.env.MONGO_QUOT_COLLECTION;
  const DB = process.env.MONGO_DB;

  const documentId = req.params.id;
  console.log("documentId", documentId);
  const collection = client.db(DB).collection(COLLECTION);

  try {
    const result = await collection.deleteOne({ _id: documentId });

    if (result.deletedCount === 1) {
      console.log("Document deleted successfully");
    } else {
      console.log("Document not found for deletion");
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
