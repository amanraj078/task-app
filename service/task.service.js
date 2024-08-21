const Task = require("../model/task.model");

// Create a new task
const createTask = async (data) => {
    if (!data) {
        return {
            success: 0,
            status: 400,
            message: "data not exist",
            result: {},
        };
    }
    const task = new Task(data);
    await task.save();
    return task;
};

const getAllTasks = async (filters = {}) => {
    const query = {};

    if (filters.status) {
        query.status = filters.status;
    }

    const tasks = await Task.find(query);
    return tasks;
};

const getTaskById = async (id) => {
    const task = await Task.findById(id);
    if (!task) {
        return {
            message: "Task not found",
        };
    }
    return task;
};

const updateTask = async (id, updateData) => {
    try {
        if (!id || !updateData) {
            throw new Error("Invalid input: ID or update data is missing.");
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedTask) {
            return {
                success: 0,
                status_code: 404,
                message: "Task not found",
                result: {},
            };
        }

        return {
            success: 1,
            status_code: 200,
            message: "Task updated successfully",
            result: updatedTask,
        };
    } catch (error) {
        console.error(error.message);
        return {
            success: 0,
            status_code: 500,
            message: error.message,
            result: {},
        };
    }
};
const deleteTask = async (id) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            throw new Error("Task not found");
        }

        return deletedTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
