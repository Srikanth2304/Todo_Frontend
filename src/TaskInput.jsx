const TaskInput = ({handleAddTask,setTaskname,taskname}) => {
    return(
        <>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="usr"
                    value={taskname}
                    onChange={(e) => setTaskname(e.target.value)}
                    placeholder='Enter the task'
                />
                <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleAddTask}
                >Add Task</button>
            </div>
        </>
    );
}
export default TaskInput