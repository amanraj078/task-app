const express = require("express");
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controller/task.controller");

const taskRouter = express.Router();

taskRouter.post("/create", createTask);
taskRouter.get("/all", getAllTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.put("/update/:id", updateTask);
taskRouter.delete("/delete/:id", deleteTask);

module.exports = taskRouter;
