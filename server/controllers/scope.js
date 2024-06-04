import { client } from "../index.js";

export const getScope = async (req, res) => {
  const DB = process.env.MONGO_DB;

  const data = await client
    .db(process.env.MONGO_DB)
    .collection("scope")
    .find({})
    .toArray();
  res.send(JSON.stringify(data));
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
