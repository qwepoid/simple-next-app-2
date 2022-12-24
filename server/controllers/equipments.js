import { db } from "../index.js";
import { client } from "../index.js";

// GET Apis
export const getEquipments = async (req, res) => {
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;

  const searchString = req.query.q;

  if (!searchString) {
    const data = await client
      .db(process.env.MONGO_DB)
      .collection(COLLECTION)
      .find({})
      .toArray();
    res.send(JSON.stringify(data));
  } else {
    const collection = client.db(DB).collection(COLLECTION);
    const query = {
      $or: [
        { equipName: { $regex: searchString, $options: "i" } },
        { serial: { $regex: searchString, $options: "i" } },
        { calibrationBy: { $regex: searchString, $options: "i" } },
        { purchasedFrom: { $regex: searchString, $options: "i" } },
        { makeModel: { $regex: searchString, $options: "i" } },
        { billNo: { $regex: searchString, $options: "i" } },
      ],
    };

    // Execute the search query
    const results = await collection.find(query).toArray();
    res.send(JSON.stringify(results));
  }
};

export const getEquipmentDetails = async (req, res) => {
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;

  const equipment = req.url.split("/")[2];
  if (!equipment) return;

  const collection = client.db(DB).collection(COLLECTION);
  const query = { ["erlId"]: `ERL/INS/${equipment}` };

  //   // Execute the search query
  const results = await collection.find(query).toArray();
  res.send(JSON.stringify(results));
};

export const getEquipmentsForTest = (req, res) => {
  const testId = req.query.testId;
  const sqlInsert = "SELECT * FROM EQUIPMENT WHERE testId = ?";
  db.query(sqlInsert, [testId], (error, result) => {
    console.log("error: ", error);
    console.log("result: ", result);
    res.send(result);
  });
};

// fix this method
export const getEquipmentsWithExpiry = (req, res) => {
  const sqlInsert = "SELECT * FROM EQUIPMENT WHERE testId = 1";
  db.query(sqlInsert, (error, result) => {
    console.log("error: ", error);
    console.log("result: ", result);
    res.send(result);
  });
};

// POST Apis
export const addEquipment = async (req, res) => {
  const newData = { name: "UTM", erlid: "e-ins-006" };
  // console.log(req.body.data)
  // console.log(JSON.parse(req.body))
  const data = await client
    .db(DB)
    .collection(COLLECTION)
    .insertMany(req.body.data);
  // console.log('--------------', req)
  res.send("hello");
  // const sqlInsert = "INSERT INTO equipment (equipmentId, name, calibrationStartDate, calibrationEndDate, testId) VALUES (3, 'Braille machine', '2022-09-09', '2023-09-09', 2)";
  // db.query(sqlInsert, (error, result) => {
  //     console.log('error: ', error);
  //     console.log('result: ', result)
  //     res.send(result)
  // })
};
export const updateEquipment = (req, res) => {
  const sqlUpdate =
    "UPDATE equipment SET name = value1, testId = 2 WHERE equipmentId = 2";
  db.query(sqlInsert, (error, result) => {
    console.log("error: ", error);
    console.log("result: ", result);
    res.send(result);
  });
};
export const deleteEquipment = (req, res) => {
  const equipmentId = req.query.id;
  const deleteQuery = "DELETE FROM equipment WHERE equipmentId=?";
  db.query(deleteQuery, [equipmentId], (error, result) => {
    console.log("error: ", error);
    console.log("result: ", result);
    res.send(result);
  });
};
