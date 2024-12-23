
import TaskItem from './TaskItem';
const TaskList = ({tasks,handleToggleTask,handleDeleteTask}) => {
    return(
        <>
            <div>
                <ul className='list-group'>
                    {tasks.map((task) => (
                        <TaskItem  key={task.id} task={task} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask}/>
                    ))}
                </ul>
            </div>
        </>
    );
}
export default TaskList