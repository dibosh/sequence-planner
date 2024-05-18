import html2canvas from 'html2canvas';
import './styles.css';
import { useEffect, useState } from 'react';

export const Header = ({ tasks, ganttChartId }) => {
  const [downloadableImgUrl, setDownloadableImgUrl] = useState('');
  const [downloadableJSON, setDownloadableJSON] = useState('');

  useEffect(() => {
    if (tasks.length > 0 && ganttChartId) {
      html2canvas(document.getElementById(ganttChartId))
        .then((canvas) => {
          const imgUrl = canvas.toDataURL('image/jpg');
          setDownloadableImgUrl(imgUrl);
        })
        .catch((err) => console.log(`Image gen failure: ${err}`));
    } else {
      setDownloadableImgUrl('');
    }

    if (tasks.length) {
      setDownloadableJSON(
        `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify({ tasks, generatedFrom: 'task-sequence-planner' }),
        )}`,
      );
    } else {
      setDownloadableJSON('');
    }
  }, [tasks, ganttChartId]);

  return (
    <header className="header">
      <div className="horizontal-group header-wrapper">
        <div className="vertical-group title-group">
          <h1 className="title">
            Task Sequence Planner{'  '}
            <span className="label">Sprint Based</span>
          </h1>
          <p className="subtitle">
            Let's you create a sequence/gantt chart of your tasks, no fuss!
          </p>
        </div>
        <div className="link-btn-group">
          {downloadableJSON && (
            <a
              download="task-sequence.json"
              className="link-btn"
              href={downloadableJSON}
            >
              Export as JSON
            </a>
          )}

          {downloadableImgUrl && (
            <a
              download="task-sequence.jpeg"
              className="link-btn"
              href={downloadableImgUrl}
            >
              Export as Image
            </a>
          )}

          <a
            className="github-button"
            href="https://github.com/itsmunim/sequence-planner"
            data-color-scheme="no-preference: dark; light: light; dark: dark;"
            data-show-count="true"
            aria-label="Star itsmunim/sequence-planner on GitHub"
          >
            Star
          </a>
        </div>
      </div>
    </header>
  );
};
