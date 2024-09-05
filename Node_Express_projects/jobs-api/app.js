require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();
// connectDB
const connectDB = require('./db/connect')
// routes
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler

// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.get("/", (req, res) => {
  res.send("Hey Boy!");
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is listening at ${PORT}`);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

start();
