const TaskItem = ({task , handleToggleTask , handleDeleteTask}) => {
    return (
        <>
            <li
                
                class="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    style={{
                        textDecoration: task.completed ? "line-through" : "none",
                    }}
                >
                    {task.title}
                </span>
                <div className='text-button '>
                    <button type="button" class="btn btn-outline-primary"
                        onClick={() => handleToggleTask(task.id)}
                    >Toggle</button>
                    <button type="button" class="btn btn-outline-danger"
                        onClick={() => handleDeleteTask(task.id)}
                    >Delete</button>
                </div>
            </li>
        </>
    );
}
export default TaskItem