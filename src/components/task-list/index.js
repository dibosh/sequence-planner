import './styles.css';

export const TaskList = ({ tasks, onDelete }) => {
  const handleDelete = (task) => {
    return () => {
      if (onDelete) {
        onDelete(task.id);
      }
    };
  };

  return (
    <div className="task-list-wrapper">
      {tasks.length === 0 ? (
        <p className="no-tasks-info">No tasks added.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task.taskName}>
              <div className="vertical-group task-meta">
                <p className="task-name">{task.taskName}</p>
                <span className="duration-pill">
                  {task.startMonthLabel}:{task.startSprintLabel} →{' '}
                  {task.endMonthLabel}:{task.endSprintLabel}
                </span>
              </div>
              <span className="delete-btn" onClick={handleDelete(task)}>
                Delete
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
