const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// 📌 1. Add a Task (Create)
router.post("/tasks", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 2. View All Tasks (Read)
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 3. Update a Task (Update)
router.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        // Check if required fields are present
        if (!title && completed === undefined) {
            return res.status(400).json({ message: "Missing fields to update" });
        }

        // Check if the task exists before updating
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: error.message });
    }
});


// 📌 4. Delete a Task (Delete)
router.delete("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
