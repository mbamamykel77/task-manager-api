import express from "express";

const router = express.Router();

import { getAllTasks, createTask, getSingleTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";


router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).put(updateTask).delete(deleteTask);

export {router};
