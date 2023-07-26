import Task from "../model/task.model.js";
import { taskValidator } from "../validation/task.validation.js";

// create task
const createTask = async (req, res) => {
  const { error } = taskValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const existingTask = await Task.findOne({ name: req.body.name });

  if (existingTask) {
    return res.status(404).json({
      status: "failed",
      message: "Task already exists",
    });
  }

  try {
    const task = new Task({
      name: req.body.name,
    });

    await task.save();

    res.status(200).json({
      status: "Success",
      message: "Task created",
      data: task,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};


// get all task
const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find();

    res.status(200).json({
      status: "success",
      message: "Task successfully retrieved",
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};


// get single task
const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({
        status: "failed",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task successfully retrieved",
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};


// update task
const updateTask = async (req, res) => {
    
    const existingTask = await Task.findOne({ name: req.body.name });

    if (existingTask) {
        return res.status(200).json({
            status: "failed",
            message: "Task already exists"
        })
    }
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    })

      if (task) {
        return res.status(200).json({
          status: "success",
          message: "Task successfully updated",
          data: task,
        });
      }

        if (!task) { 
            return res.status(404).json({
          status: "failed",
          message: "Task not found",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};



const deleteTask = (req, res) => {
  res.send("Delete task");
};

export { getAllTasks, createTask, getSingleTask, updateTask, deleteTask };
