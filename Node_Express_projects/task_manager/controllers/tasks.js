import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    console.log("Get All Tasks Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    console.log("Create Task Request Body: ", req.body);
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    console.log("Create Task Error: ", error);
    res.status(500).json({ Message: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.log("Get Task Error: ", error);
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json({ message: "Task not Found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.log("Update Task Error: ", error);
    res.status(500).json({ Error: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: `Task with ${taskID} not found` });
    }
    res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    console.log("Delete Task Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createTask, getTask, updateTask, deleteTask, getAllTasks };
