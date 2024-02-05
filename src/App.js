import { GanttChart, TaskForm, TaskList, Header } from './components';
import './app.css';
import { useState } from 'react';

function App() {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const sprintNames = ['A', 'B'];

  const ganttChartId = 'sequence-gantt';

  const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const [tasks, setTasks] = useState([]);

  const handleAddTask = ({
    taskName,
    startMonth,
    startSprint,
    endMonth,
    endSprint,
  }) => {
    tasks.push({
      id: uid(),
      taskName,
      startMonth,
      startSprint,
      endMonth,
      endSprint,
      startMonthLabel: months[startMonth],
      startSprintLabel: sprintNames[startSprint],
      endMonthLabel: months[endMonth],
      endSprintLabel: sprintNames[endSprint],
    });

    setTasks([...tasks]);
  };

  const handleDeleteTask = (taskId) => {
    const foundIndex = tasks.findIndex((task) => task.id === taskId);
    if (foundIndex !== -1) {
      tasks.splice(foundIndex, 1);
      setTasks([...tasks]);
    }
  };

  const transformTasksToGanttChartItems = () => {
    return tasks.map(
      ({ taskName, color, startMonth, startSprint, endMonth, endSprint }) => ({
        label: taskName,
        color,
        spanStartCol: Number(startMonth),
        spanStartSegment: Number(startSprint),
        spanEndCol: Number(endMonth),
        spanEndSegment: Number(endSprint),
      }),
    );
  };

  return (
    <div>
      <Header tasks={tasks} ganttChartId={ganttChartId} />
      <div className="wrapper">
        <div className="app">
          <div className="task-input-pane">
            <TaskForm
              months={months}
              sprintNames={sprintNames}
              onAdd={handleAddTask}
            />
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
          </div>
          <GanttChart
            id={ganttChartId}
            className="gantt"
            headerLabels={months}
            rowSpans={transformTasksToGanttChartItems()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
