import { client } from "../index.js";
export const getDetailedScope = async (req, res) => {};

export const getTestParameters = async (req, res) => {
  const { material } = req.body;
  try {
    const COLLECTION = process.env.MONGO_SCOPE_COLLECTION;
    const DB = process.env.MONGO_DB;

    const collection = client.db(DB).collection(COLLECTION);
    const query = { ["material"]: material };

    const results = await collection
      .find(query)
      .project({
        testParameter: 1,
      })
      .toArray();
    res.send(JSON.stringify(results));
  } catch (er) {
    res.status(500).json({ message: "something went wrong" });
  }
};
