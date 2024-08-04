// const mongoose = require('mongoose');
// const express = require('express');

// const app = express();
// mongoose.connect("mongodb://127.0.0.1:27017/school", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const StudentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   cgpa: {
//     type: Number,
//     required: false,
//   },
//   fullTime: {
//     type: Boolean,
//     required: true,
//   },
// });

// const Students = mongoose.model("Students", StudentSchema);

// app.get("/get_students", async (req, res) => {
//   try {
//     const students = await Students.find({});
//     if (!students.length) {
//       return res.status(404).json({ message: "Students Not Found" });
//     }
//     res.status(200).json({ message: "Students Data", students });
//   } catch (error) {
//     console.error("Error: ", error);
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// });

// const PORT = 8090;

// app.listen(PORT, () => {
//   console.log("Server Is listening at: ", PORT);
// });

import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  });
};

export default connectDB;
