import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Todo.css';
import { useState } from 'react';
import { useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';



function Todo() {
    const [tasks, setTasks] = useState([]);
    const [taskname, setTaskname] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error Fetching logs", error));
    }, []);

    const handleAddTask = () => {
        if (taskname.trim() === "") {
            alert("Task name cannot be empty");
            return;
        }

        const newTask = { "completed": false,"title": taskname };
        fetch("http://localhost:8080/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((addTask) => {
                console.log("Backend Response:", addTask);
                setTasks([...tasks, addTask]);
                setTaskname("");
            })
            .catch((error) => console.error("Error Fetching Logs", error));
    };

    const handleToggleTask = (taskid) => (
        fetch(`http://localhost:8080/tasks/${taskid}/toggle`)
        .then((response) => response.json())
        .then((updatedTasks) => setTasks(updatedTasks))
        .catch((error) => console.error("Error Fetching Logs",error))
    );

    const handleDeleteTask = (taskid) =>(
        fetch(`http://localhost:8080/tasks/${taskid}/delete`)
        .then(() => setTasks(tasks.filter((task) => taskid !== task.id)))
        .catch((error) => console.error("Error Fetching Logs",error))
    );
    return (
        <div className="container">
            <h1>Todo Application</h1>
            <TaskInput  handleAddTask={handleAddTask} setTaskname={setTaskname} taskname={taskname}/>
            <TaskList tasks={tasks} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask}/>
        </div>
    );
}
export default Todo