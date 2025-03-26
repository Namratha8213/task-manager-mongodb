import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  List,
  ListItemText,
  IconButton,
  Switch,
  FormControlLabel,
  CssBaseline,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.get(`${API_URL}/tasks`)

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Theme for Dark/Light mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add Task
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

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit Task
  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditTitle("");
  };

  const updateTask = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { title: editTitle });
      setEditingTask(null);
      setEditTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <h1 style={{ fontWeight: "bold" }}>Task Manager</h1>

        {/* Dark Mode Toggle */}
        <FormControlLabel
          control={
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          }
          label="Dark Mode"
        />

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
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

        {/* Task List */}
        <List sx={{ mt: 3 }}>
          {tasks.map((task) => (
            <Card
              key={task._id}
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: "12px",
                background: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                boxShadow: darkMode
                  ? "0 4px 12px rgba(255, 255, 255, 0.2)"
                  : "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: darkMode
                    ? "0 6px 16px rgba(255, 255, 255, 0.3)"
                    : "0 6px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 18px",
                }}
              >
                {editingTask === task._id ? (
                  <TextField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    fullWidth
                  />
                ) : (
                  <ListItemText
                    primary={task.title}
                    secondary={task.status}
                  />
                )}
                {editingTask === task._id ? (
                  <>
                    <Button onClick={() => updateTask(task._id)}>Update</Button>
                    <Button onClick={cancelEditing}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => startEditing(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteTask(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default App;