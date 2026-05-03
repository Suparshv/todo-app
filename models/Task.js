const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title cannot be empty"],
    trim: true,
  },
  description: String,
  completed: { type: Boolean, default: false },
  category: { type: String, default: "General" },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);