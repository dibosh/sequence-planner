import { useEffect, useState } from 'react';
import './styles.css';

export const TasksFileSelector = ({ onTasksLoad: onTasksLoaded }) => {
  const [tasks, setTasks] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleFileSelect = (evt) => {
    const reader = new FileReader();
    reader.onload = (fileLoadedEvt) => {
      try {
        const jsonData = JSON.parse(fileLoadedEvt.target.result);
        if (
          jsonData.generatedFrom === 'task-sequence-planner' &&
          jsonData.tasks
        ) {
          setTasks(jsonData.tasks);
        } else {
          alert('JSON not produced from this app!');
        }
      } catch (err) {
        alert(`Can not parse selected JSON: ${err}`);
      } finally {
        // reset the file input
        setFileInputKey(Date.now());
      }
    };
    reader.readAsText(evt.target.files[0]);
  };

  useEffect(() => {
    if (tasks.length > 0 && onTasksLoaded) {
      onTasksLoaded(tasks);
    }
  }, [tasks, onTasksLoaded]);

  return (
    <div className="vertical-group tasks-file-selector">
      <label htmlFor="task-name">Load from JSON</label>
      <input
        key={fileInputKey}
        name="tasks-file"
        type="file"
        accept="application/JSON"
        placeholder="Select a presaved JSON"
        onChange={handleFileSelect}
      />
    </div>
  );
};
