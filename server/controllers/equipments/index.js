import { db } from "../../index.js";
import { client } from "../../index.js";
import { ObjectId } from "mongodb";

// GET Apis
export const getEquipments = async (req, res) => {
  console.log(
    "reached endpoint 1----------------------------------------------------------------"
  );
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;
  // const collection = await client.db(DB).collection(COLLECTION);
  const searchString = req.query.q;
  console.log(
    "reached endpoint 2 ----------------------------------------------------------------"
  );
  if (!searchString) {
    console.log("reached endpoint 2.5 with: ", client);
    const data = await client.db(DB).collection(COLLECTION).find({}).toArray();
    console.log(
      "reached endpoint 3--------------------------------------------"
    );
    res.send(JSON.stringify(data));
  } else {
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
    console.log("reached endpoint 4 --------------------");
    console.log("reahceeeeeed");
    // Execute the search query
    const results = await client
      .db(DB)
      .collection(COLLECTION)
      .find(query)
      .toArray();
    res.send(JSON.stringify(results));
  }
};

export const getEquipmentDetails = async (req, res) => {
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;

  console.log("reached here");

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

export const updateDateFieldsOne = async (req, res) => {
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;
  // Retrieves the first document in the collection
  var doc = await client.db(DB).collection(COLLECTION).findOne({});

  if (doc) {
    console.log("----------dic is: ----------------", doc);
    var updatedCalibratedFrom;
    var updatedCalibratedTo;

    // Assuming your string date is in this field
    var calibratedFrom = doc.calibrationFrom;
    var calibratedTo = doc.calibrationTo;

    /** From */
    var matchDDMMYYYY = calibratedFrom.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (matchDDMMYYYY) {
      var day = matchDDMMYYYY[1];
      var month = matchDDMMYYYY[2];
      var year = matchDDMMYYYY[3];
      updatedCalibratedFrom = new Date(`${year}-${month}-${day}`);
    } else {
      // Check if the date string matches the YYYY-MM-DD format
      var matchYYYYMMDD = calibratedFrom.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (matchYYYYMMDD) {
        updatedCalibratedFrom = new Date(calibratedFrom);
      } else {
        // Handle any other format or invalid dates here
        // For instance, you might log an error or handle accordingly
        print("Invalid date format:", calibratedFrom);
        return;
        // Skip this document if the format is not recognized
      }
    }
    /** To */
    var matchDDMMYYYY = calibratedTo.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (matchDDMMYYYY) {
      var day = matchDDMMYYYY[1];
      var month = matchDDMMYYYY[2];
      var year = matchDDMMYYYY[3];
      updatedCalibratedTo = new Date(`${year}-${month}-${day}`);
    } else {
      // Check if the date string matches the YYYY-MM-DD format
      var matchYYYYMMDD = calibratedTo.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (matchYYYYMMDD) {
        updatedCalibratedTo = new Date(calibratedTo);
      } else {
        // Handle any other format or invalid dates here
        // For instance, you might log an error or handle accordingly
        print("Invalid date format:", calibratedTo);
        return; // Skip this document if the format is not recognized
      }
    }

    // Update the document to set the field as a Date object
    const result = await client
      .db(DB)
      .collection(COLLECTION)
      .updateOne(
        { _id: doc._id }, // Assuming you have an identifier like _id
        {
          $set: {
            calibrationFrom: updatedCalibratedFrom,
            calibrationTo: updatedCalibratedTo,
          },
        }
      );

    if (result.matchedCount && result.modifiedCount) {
      res.status(200).json({ message: "Document updated successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no updates applied" });
    }
  }
};

export const updateDateFields = async () => {
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;

  await client
    .db(DB)
    .collection(COLLECTION)
    .find({})
    .forEach(function (doc) {
      var updatedCalibratedFrom;
      var updatedCalibratedTo;

      var calibratedFrom = doc.calibrationFrom; // Assuming your string date is in this field
      var calibratedTo = doc.calibrationTo;

      console.log("calibratedFrom: ", calibratedFrom, calibratedFrom.length);

      // return;

      if (!calibratedFrom || calibratedFrom?.length === undefined) return;

      /** From */
      var matchDDMMYYYY = calibratedFrom.match(/^(\d{2})-(\d{2})-(\d{4})$/);
      if (matchDDMMYYYY) {
        var day = matchDDMMYYYY[1];
        var month = matchDDMMYYYY[2];
        var year = matchDDMMYYYY[3];
        updatedCalibratedFrom = new Date(`${year}-${month}-${day}`);
      } else {
        // Check if the date string matches the YYYY-MM-DD format
        var matchYYYYMMDD = calibratedFrom.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (matchYYYYMMDD) {
          updatedCalibratedFrom = new Date(calibratedFrom);
        } else {
          // Handle any other format or invalid dates here
          // For instance, you might log an error or handle accordingly
          print("Invalid date format:", calibratedFrom);
          return; // Skip this document if the format is not recognized
        }
      }

      /** To */
      var matchDDMMYYYY = calibratedTo.match(/^(\d{2})-(\d{2})-(\d{4})$/);
      if (matchDDMMYYYY) {
        var day = matchDDMMYYYY[1];
        var month = matchDDMMYYYY[2];
        var year = matchDDMMYYYY[3];
        updatedCalibratedTo = new Date(`${year}-${month}-${day}`);
      } else {
        // Check if the date string matches the YYYY-MM-DD format
        var matchYYYYMMDD = calibratedTo.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (matchYYYYMMDD) {
          updatedCalibratedTo = new Date(calibratedTo);
        } else {
          // Handle any other format or invalid dates here
          // For instance, you might log an error or handle accordingly
          print("Invalid date format:", calibratedTo);
          return; // Skip this document if the format is not recognized
        }
      }

      // Update the document to set the field as a Date object
      client
        .db(DB)
        .collection(COLLECTION)
        .updateOne(
          { _id: doc._id }, // Assuming you have an identifier like _id
          {
            $set: {
              calibrationFrom: updatedCalibratedFrom,
              calibrationTo: updatedCalibratedTo,
            },
          }
        );
    });
};

export const updateEquipment = async (req, res) => {
  const COLLECTION = process.env.MONGO_COLLECTION;
  const DB = process.env.MONGO_DB;

  const collection = await client.db(DB).collection(COLLECTION);

  console.log("Reached here successfully");
  const equipmentId = req.body._id;
  const updateData = req.body;
  if (updateData.hasOwnProperty("_id")) {
    console.log("Before deletion:", updateData);
    delete updateData["_id"];
    console.log("After deletion:", updateData);
  } else {
    console.log(`The key id does not exist in the object.`);
  }

  try {
    const filter = { _id: new ObjectId(equipmentId) };

    // Construct the update operation
    const updateOperation = {
      $set: updateData, // Use $set to update specific fields
      // Other update operators like $inc, $push, $unset, etc., can be used here as needed
    };

    const result = await collection.updateOne(filter, updateOperation);

    if (result.matchedCount && result.modifiedCount) {
      res.status(200).json({ message: "Document updated successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found or no updates applied" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection
    await client.close();
  }
};

// export const updateEquipment = (req, res) => {
//   const sqlUpdate =
//     "UPDATE equipment SET name = value1, testId = 2 WHERE equipmentId = 2";
//   db.query(sqlInsert, (error, result) => {
//     console.log("error: ", error);
//     console.log("result: ", result);
//     res.send(result);
//   });
// };
export const deleteEquipment = (req, res) => {
  const equipmentId = req.query.id;
  const deleteQuery = "DELETE FROM equipment WHERE equipmentId=?";
  db.query(deleteQuery, [equipmentId], (error, result) => {
    console.log("error: ", error);
    console.log("result: ", result);
    res.send(result);
  });
};
