import { client } from "../index.js";

export const getScope = async (req, res) => {
  const DB = process.env.MONGO_DB;
  const COLLECTION = process.env.MONGO_SCOPE_COLLECTION;
  const searchString = req.query.search;

  const query = {};
  if (req.query.discipline) {
    query.discipline = req.query.discipline ?? null;
  }
  if (req.query.group) {
    query.group = decodeURIComponent(req.query.group) ?? null;
  }
  if (req.query.material) {
    query.material = req.query.material ?? null;
  }
  console.log("search string:", searchString);
  if (searchString) {
    query.$or = [
      { discipline: { $regex: searchString, $options: "i" } },
      { group: { $regex: searchString, $options: "i" } },
      { material: { $regex: searchString, $options: "i" } },
      { parameter: { $regex: searchString, $options: "i" } },
      { method: { $regex: searchString, $options: "i" } },
      { nablSerial: { $regex: searchString, $options: "i" } },
    ];
    const data = await client
      .db(process.env.MONGO_DB)
      .collection(COLLECTION)
      .find(query)
      .toArray();
    res.send(JSON.stringify(data));
    return;
  }

  const data = await client
    .db(process.env.MONGO_DB)
    .collection(COLLECTION)
    .find(query)
    .toArray();
  res.send(JSON.stringify(data));
};

export const getGroups = async (req, res) => {
  const DB = process.env.MONGO_DB;
  const COLLECTION = process.env.MONGO_SCOPE_COLLECTION;
  const discipline = req?.query?.discipline;
  console.log(
    "------------------- here =================",
    req.query.discipline
  );

  const pipeline = [];

  if (discipline) {
    pipeline.push({ $match: { ["discipline"]: req.query.discipline } });
  }

  pipeline.push(
    { $group: { _id: `$group` } },
    { $project: { _id: 0, distinctValue: "$_id" } }
  );

  const distinctValues = await client
    .db(DB)
    .collection(COLLECTION)
    .aggregate(pipeline)
    .toArray();
  const result = distinctValues.map((item) => item.distinctValue);

  // const data = await client.db(DB).collection(COLLECTION).distinct("group");

  // console.log("------------------- data =================", result);
  res.send(result);
};

export const getMaterials = async (req, res) => {
  const DB = process.env.MONGO_DB;
  const COLLECTION = process.env.MONGO_SCOPE_COLLECTION;
  const discipline = req?.query?.discipline;
  const group = req?.query?.group;

  const pipeline = [];

  if (discipline) {
    pipeline.push({ $match: { ["discipline"]: req.query.discipline } });
  }
  if (group) {
    pipeline.push({
      $match: { ["group"]: decodeURIComponent(req.query.group) },
    });
  }

  pipeline.push(
    { $group: { _id: `$material` } },
    { $project: { _id: 0, distinctValue: "$_id" } },
    { $sort: { distinctValue: 1 } }
  );

  const distinctValues = await client
    .db(DB)
    .collection(COLLECTION)
    .aggregate(pipeline)
    .toArray();
  const result = distinctValues.map((item) => item.distinctValue);

  // const data = await client.db(DB).collection(COLLECTION).distinct("group");

  // console.log("------------------- data =================", result);
  res.send(result);
};

function getDisciplineAndGroup(disciplineGroup) {
  if (disciplineGroup.indexOf("NON-DESTRUCTIVE") !== -1) {
    return {
      discipline: "NON-DESTRUCTIVE",
      group: disciplineGroup.split("NON-DESTRUCTIVE- ")[1],
    };
  } else if (disciplineGroup.indexOf("CHEMICAL") !== -1) {
    return {
      discipline: "CHEMICAL",
      group: disciplineGroup.split("CHEMICAL- ")[1],
    };
  } else if (disciplineGroup.indexOf("MECHANICAL") !== -1) {
    return {
      discipline: "MECHANICAL",
      group: disciplineGroup.split("MECHANICAL- ")[1],
    };
  } else {
    return {
      discipline: "",
      group: "",
    };
  }
}

function formatScopeData(data) {
  return data?.map((datum) => {
    const discipline = getDisciplineAndGroup(datum?.disciplineGroup).discipline;
    const group = getDisciplineAndGroup(datum?.disciplineGroup).group;

    return {
      nablSerial: datum.nablSerial,
      discipline: discipline,
      group: group,
      material: datum.material,
      parameter: datum.parameter,
      method: datum.method,
    };
  });
}

async function readData(res) {
  const DB = process.env.MONGO_DB;
  const COLLECTION = process.env.MONGO_SCOPE_COLLECTION;
  fetch("http://127.0.0.1:8000/getScope")
    .then((res) => res.json())
    .then(async (data) => {
      await client
        .db(DB)
        .collection(COLLECTION)
        .insertMany(formatScopeData(data.key));
      res.send("done");
    });
}

export const addScope = async (req, res) => {
  readData(res);
};
