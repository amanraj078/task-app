const express = require("express");
require("dotenv").config();
require("./db/connect");

const taskRouter = require("./routes/task.routes");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/tasks", taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
