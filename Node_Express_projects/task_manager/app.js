import express from "express";
import "dotenv/config.js"
import router from "./routes/tasks.js";

import connectDB from "./db/connectDatabase.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1/tasks', router); 

const databaseName = 'task_manager'; // Choose of your own
const mongoUrl = `${process.env.MONGO_URI}/${databaseName}`; 

const start = async () => {
  try {
    await connectDB(mongoUrl);
    app.listen(port, () => {
      console.log("Hey Server is listening at: ", port);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}

start();


