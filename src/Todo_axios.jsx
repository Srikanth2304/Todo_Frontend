import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Todo.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Todo_axios() {
    const [tasks, setTasks] = useState([]);
    const [taskname, setTaskname] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/tasks")
            .then((response) => setTasks(response.data))
            .catch((error) => console.error("Error in Fetching Tasks", error));
    }, []);

    const handleAddTask = () => {
        if (taskname.trim() === "") {
            alert("Task name cannot be empty");
            return;
        }

        const newTask = { completed: false, title: taskname };
        axios.post("http://localhost:8080/tasks", newTask)
            .then((response) => {
                console.log("Backend Response:", response.data);
                setTasks([...tasks, response.data]); // Corrected line
                setTaskname("");
            })
            .catch((error) => console.error("Error in creating Task", error));
    };

    const handleToggleTask = (taskid) => {
        axios.put(`http://localhost:8080/tasks/${taskid}/toggle`)
            .then((response) => setTasks(response.data))
            .catch((error) => console.error("Error Fetching Logs", error));
    };

    const handleDeleteTask = (taskid) => {
        axios.delete(`http://localhost:8080/tasks/${taskid}/delete`)
            .then(() => setTasks(tasks.filter((task) => taskid !== task.id)))
            .catch((error) => console.error("Error Fetching Logs", error));
    };

    return (
        <div className="container">
            <h1>Todo Application</h1>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="usr"
                    value={taskname}
                    onChange={(e) => setTaskname(e.target.value)}
                    placeholder="Enter the task"
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddTask}
                >
                    Add Task
                </button>
            </div>
            <div>
                <ul className="list-group">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span
                                style={{
                                    textDecoration: task.completed ? "line-through" : "none",
                                }}
                            >
                                {task.title}
                            </span>
                            <div className="text-button">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={() => handleToggleTask(task.id)}
                                >
                                    Toggle
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo_axios;
