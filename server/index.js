import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";
import {
  getEquipments,
  addEquipment,
  getEquipmentsForTest,
  updateEquipment,
  deleteEquipment,
  getEquipmentsWithExpiry,
} from "./controllers/equipments.js";
import {
  addJob,
  getJobs,
  deleteJob,
  updateJob,
  getJobDetails,
} from "./controllers/job.js";
import { addTest, getTests, updateTest } from "./controllers/test.js";
import { getDashboardData } from "./controllers/dashboard.js";
import {
  getJobTasks,
  addJobTask,
  updateJobTask,
  removeJobTask,
} from "./controllers/task.js";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import scopeRouter from "./routes/scopeRouter.js";
import mongoose from "mongoose";
import ptRouter from "./routes/ptRouter.js";
import equipmentsRouter from "./routes/equipmentsRouter.js";
dotenv.config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("skdb").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    //   console.log(client.db('admin').collection('skdb').aggregate())
    // const data = await client.db("skdb").collection("inst").find({}).toArray();
    // console.log("!!: ", data);
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
// run();

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
    dbName: "skdb1d",
  })
  .then(() => {
    // Check the connection status
    if (mongoose.connection.readyState === 1) {
      // Ping the 'asb' database
      mongoose.connection.db.stats((error, stats) => {
        if (error) {
          console.error("Ping error:", error);
        } else {
          console.log("Ping result:", stats);
        }
      });
      console.log("Connected to MongoDB");
    } else {
      console.error("Connection is not established");
    }
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

/**
 * Open points:
 * 1. convert get to post.
 *
 */

app.use(express.json());

app.use((req, res, next) => {
  console.log("HTTP method: " + req.method + ", URL: ", req.url);
  next();
});

app.use("/pt", ptRouter);

app.use("/users", userRouter);

app.use("/scope", scopeRouter);

app.use("/equipments", equipmentsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the project");
});

app.get("/test", (req, res) => {
  res.send("This is a test response");
});

// Dashboard
app.get("/api/getDashboardData", getDashboardData);

// Tests
app.get("/api/getTests", getTests);
app.post("/api/addTest", addTest);
app.post("/api/updateTest", updateTest);
// Tasks
app.get("/api/getJobTasks", getJobTasks);
app.post("/api/addJobTask", addJobTask);
app.post("/api/updateJobTask", updateJobTask);
app.get("/api/removeJobTask", removeJobTask);

// Equipments
app.get("/api/getEquipments", getEquipments);
app.get("/api/getEquipmentsForTest", getEquipmentsForTest);
app.get("/api/getEquipmentsWithExpiry", getEquipmentsWithExpiry);
app.post("/api/addEquipment", addEquipment);
app.post("/api/updateEquipment", updateEquipment);
app.get("/api/deleteEquipment", deleteEquipment);

// Jobs
app.get("/api/getJobs", getJobs);
app.get("/api/getJobDetails", getJobDetails);
app.post("/api/addJob", addJob);
app.post("/api/updateJob", updateJob);
app.get("/api/deleteJob", deleteJob);

app.listen(5000, () => console.log("Server is running on port 5000"));
