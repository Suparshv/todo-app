require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Task = require("./models/Task");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// DB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB Connection Error:", err));

// ROUTES

// 1. View all tasks
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.render("index", { tasks, error: null });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 2. Create Task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, category, dueDate } = req.body;
    await Task.create({ title, description, category, dueDate });
    res.redirect("/");
  } catch (err) {
    const tasks = await Task.find();
    res.render("index", { tasks, error: err.message });
  }
});

// 3. Mark as Completed (With Validation)
app.post("/tasks/:id/complete", async (req, res) => {
  try {
   const task = await Task.findById(req.params.id); // Fixed: added .params

      if (!task) {
       console.log("Task not found");
     return res.status(404).send("Task not found");
   }
    if (task.completed) {
     return res.redirect("/");
   }
   task.completed = true;
   await task.save();
   console.log("Task successfully updated in DB");
   res.redirect("/");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 4. Delete Task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
