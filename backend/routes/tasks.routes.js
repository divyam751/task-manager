const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");
const { authentication } = require("../middleware/authMiddleware"); // Import the authentication function

// Middleware to verify JWT token and extract user ID
router.use(authentication);

// Create a new task for the authenticated user
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
      completed: false,
      user: req.userId, // Associate task with authenticated user
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Get all tasks of the authenticated user
router.get("/", async (req, res) => {
  try {
    // console.log("User ID:", req.userId);

    const tasks = await Task.find({ user: req.userId });
    // console.log("Tasks:", tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Get a single task of the authenticated user by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// Update a task of the authenticated user
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete a task of the authenticated user
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    }); // Find and delete task by ID and user
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
