import { useState } from 'react';

export const MonthSprintInputGroup = ({
  name,
  monthInputLabel,
  sprintInputLabel,
  month,
  sprint,
  months = [],
  sprintNames = [],
  onChange,
}) => {
  const [monthSprint, setMonthSprint] = useState({
    month,
    sprint,
  });

  const getChangeHandler = (valueName) => {
    return (evt) => {
      const val = evt.target.value;
      const change = { ...monthSprint, [valueName]: val };
      setMonthSprint(change);
      if (onChange) {
        onChange({ name, monthSprint: change });
      }
    };
  };

  const handleMonthChange = getChangeHandler('month');
  const handleSprintChange = getChangeHandler('sprint');

  return (
    <div className="horizontal-group">
      <div className="vertical-group expand-half">
        <label htmlFor="month">{monthInputLabel}</label>
        <select
          name="month"
          value={monthSprint.month}
          onChange={handleMonthChange}
        >
          {months.map((option, idx) => (
            <option value={idx} key={idx}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="vertical-group expand-half">
        <label htmlFor="sprint">{sprintInputLabel}</label>
        <select
          name="sprint"
          value={monthSprint.sprint}
          onChange={handleSprintChange}
        >
          {sprintNames.map((name, idx) => (
            <option value={idx} key={idx}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
