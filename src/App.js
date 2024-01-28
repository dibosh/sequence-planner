import { GanttChart } from './components';
import './app.css';

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

  const tasks = [
    {
      label: 'Offline Detector',
      color: '#76c893',
      spanStartCol: -5,
      spanStartSegment: 0,
      spanEndCol: 9,
      spanEndSegment: 1,
    },
  ];

  return (
    <div className="wrapper">
      <div className="app">
        <div className="task-input-pane"></div>
        <GanttChart className="gantt" headerLabels={months} rowSpans={tasks} />
      </div>
    </div>
  );
}

export default App;
