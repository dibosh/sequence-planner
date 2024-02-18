import { useEffect, useState } from 'react';
import { MonthSprintInputGroup } from './month-sprint-input-group';

import './styles.css';

export const TaskForm = ({ months, sprintNames, onAdd }) => {
  const [err, setErr] = useState('');
  const defaultState = {
    taskName: '',
    startMonth: 0,
    endMonth: 1,
    startSprint: 0,
    endSprint: 0,
  };

  const [formState, setFormState] = useState(defaultState);

  const ERR_START_END_MUST_HAVE_DIFF = 'End must be later than start.';

  const isAddButtonDisabled = () => {
    return err.length > 0 || formState.taskName.trim().length === 0;
  };

  const handleAddTask = () => {
    if (onAdd && !formState.err && formState.taskName.length > 0) {
      onAdd(formState);
      setFormState(defaultState);
    }
  };

  const handleTaskNameChange = (evt) =>
    setFormState({ ...formState, taskName: evt.target.value });

  const preventFormRefresh = (evt) => evt.preventDefault();

  const handleMonthSprintChange = ({ name, monthSprint }) => {
    const monthSprintChange = Object.keys(monthSprint).reduce((accum, key) => {
      const val = monthSprint[key];
      accum[`${name}${key.charAt(0).toUpperCase()}${key.slice(1)}`] = val;
      return accum;
    }, {});
    setFormState({ ...formState, ...monthSprintChange });
  };

  useEffect(() => {
    const { startMonth, startSprint, endMonth, endSprint } = formState;
    if (startMonth + startSprint >= endMonth + endSprint) {
      setErr(ERR_START_END_MUST_HAVE_DIFF);
    } else {
      setErr('');
    }
  }, [formState]);

  return (
    <form onSubmit={preventFormRefresh}>
      <div className="vertical-group-gap-12px task-form">
        <div className="vertical-group">
          <label htmlFor="task-name">Task</label>
          <input
            name="task-name"
            type="text"
            placeholder="Enter task name..."
            value={formState.taskName}
            onChange={handleTaskNameChange}
          />
        </div>

        <MonthSprintInputGroup
          name="start"
          months={months}
          month={formState.startMonth}
          sprint={formState.startSprint}
          sprintNames={sprintNames}
          monthInputLabel="Start Month"
          sprintInputLabel="Start Sprint"
          onChange={handleMonthSprintChange}
        />

        <MonthSprintInputGroup
          name="end"
          months={months}
          month={formState.endMonth}
          sprint={formState.endSprint}
          sprintNames={sprintNames}
          monthInputLabel="End Month"
          sprintInputLabel="End Sprint"
          onChange={handleMonthSprintChange}
        />

        {err && <p className="error-text">{err}</p>}

        <button
          className="add-task-btn"
          disabled={isAddButtonDisabled()}
          onClick={handleAddTask}
        >
          + Add Task
        </button>
      </div>
    </form>
  );
};
