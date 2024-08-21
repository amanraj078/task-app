const taskService = require("../service/task.service");
const validationHelper = require("../helpers/validation");

// Controller to handle task creation
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            return res.json({
                success: 0,
                status_code: 500,
                message: "Add the title of the task",
                result: {},
            });
        }
        console.log(description);

        const newTask = await taskService.createTask({
            title,
            description,
            status,
        });

        return res.json(newTask);
    } catch (error) {
        console.log(error);
        res.json({
            success: 0,
            status_code: 500,
            message: error.message,
            result: {},
        });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const filters = {};

        if (req.query.status) {
            filters.status = req.query.status;
        }

        const tasks = await taskService.getAllTasks(filters);
        return res.json(tasks);
    } catch (error) {
        console.log(error);
        return {
            success: 0,
            status: 500,
            message: error.message,
            result: {},
        };
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        return res.json(task);
    } catch (error) {
        console.log(error.message);
        return {
            success: 0,
            status: 500,
            message: error.message,
            result: {},
        };
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id || !updateData) {
            return res.status(400).json({
                success: 0,
                status_code: 400,
                message: "Task ID or update data is missing",
                result: {},
            });
        }

        // Validate required fields
        const requiredFields = ["title", "status"];
        const validationErrors = validationHelper.validation(
            requiredFields,
            updateData
        );

        // if (Object.keys(validationErrors).length) {
        //     return res.status(400).json({
        //         success: 0,
        //         status_code: 400,
        //         message: "Validation failed",
        //         result: validationErrors,
        //     });
        // }

        const result = await taskService.updateTask(id, updateData);

        return res.status(result.status_code).json(result);
    } catch (error) {
        console.error(error); // Log the error to the console for debugging
        return res.status(500).json({
            success: 0,
            status_code: 500,
            message: error.message,
            result: {},
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await taskService.deleteTask(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        if (error.message === "Task not found") {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
