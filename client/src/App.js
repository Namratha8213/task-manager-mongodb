import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;
        try {
            await axios.post(API_URL, { title: taskTitle, status: "Pending" });
            setTaskTitle("");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
            <h1>Task Manager</h1>
            <form onSubmit={addTask} style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <TextField
                    variant="outlined"
                    label="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Task
                </Button>
            </form>

            <List sx={{ mt: 3 }}>
                {tasks.map((task) => (
                    <ListItem key={task._id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText primary={task.title} secondary={task.status} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default App;
