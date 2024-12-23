import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Todo.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Todo_prod() {
    const [tasks, setTasks] = useState([]);
    const [taskname, setTaskname] = useState("");

    const logMessage = (type, message, details = null) => {
        console[type](`[${type.toUpperCase()}] - ${message}`, details || "");
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tasks`);
                if (!response.status) {
                    throw new Error(`Failed to fetch tasks. Status:${response.status}`);
                }
                setTasks(response.data);
                logMessage("info", "Tasks fetched successfully", response.data);
            } catch (error) {
                logMessage("error", "Error while fetching tasks", error);
                alert(`An error occured while fetching tasks`);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        if (taskname.trim() === "") {
            alert("Task name cannot be empty");
            return;
        }
        const newTask = { "completed": false, "title": taskname };
        try {
            const response = await axios.post(`http://localhost:8080/tasks`, newTask);
            if (!response.status) {
                throw new Error(`Failed to fetch tasks. Status:${response.status}`);
            }
            setTasks([...tasks, response.data]);
            setTaskname("");
            logMessage("info", "Task added successfully", response.data);
        } catch (error) {
            logMessage('error', 'Error while adding tasks', error);
            alert('An error occured while adding tasks');
        }
    };

    const handleToggleTask = async (taskid) => {
        try {
            const response = await axios.put(`http://localhost:8080/tasks/${taskid}/toggle`);
            if (!response.status) {
                throw new Error(`Failed to update task. Status: ${response.status}`);
            }
            setTasks(response.data);
            logMessage("info", "Task toggled successfully", response.data);
        } catch (error) {
            logMessage('error', 'Error while updating tasks', error);
            alert('An error occurred while updating tasks');
        }
    };
    

    const handleDeleteTask = async (taskid) => {
        try {
            const response = await axios.delete(`http://localhost:8080/tasks/${taskid}/delete`);
            if (!response.status) {
                throw new Error(`Failed to fetch tasks. Status:${response.status}`);
            }
            setTasks(tasks.filter((task) => taskid !== task.id));
            logMessage("info", "Task toggled succesfully", response.data);
        }
        catch(error){
            logMessage('error','Error while deleting tasks',error);
            alert('An error occured whlie deleting tasks');
        }
        
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
                    placeholder='Enter the task'
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddTask}
                >Add Task</button>
            </div>
            <div>
                <ul className='list-group'>
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
                            <div className='text-button '>
                                <button type="button" className="btn btn-outline-primary"
                                    onClick={() => handleToggleTask(task.id)}
                                >Toggle</button>
                                <button type="button" className="btn btn-outline-danger"
                                    onClick={() => handleDeleteTask(task.id)}
                                >Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Todo_prod