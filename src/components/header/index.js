import html2canvas from 'html2canvas';
import './styles.css';
import { useEffect, useState } from 'react';

export const Header = ({ tasks, ganttChartId }) => {
  const [downloadableImgUrl, setDownloadableImgUrl] = useState('');

  useEffect(() => {
    html2canvas(document.getElementById(ganttChartId))
      .then((canvas) => {
        const imgUrl = canvas.toDataURL('image/jpg');
        setDownloadableImgUrl(imgUrl);
      })
      .catch((err) => console.log(`Image gen failure: ${err}`));
  }, [tasks, ganttChartId]);

  return (
    <header className="header">
      <div className="horizontal-group header-wrapper">
        <div className="vertical-group title-group">
          <h1 className="title">
            Task Sequence Planner <span className="label">Sprint Based</span>
          </h1>
          <p className="subtitle">
            Let's you create a sequence/gantt chart of your tasks, no fuss!
          </p>
        </div>
        {tasks.length > 0 && (
          <a
            download="sequence.jpeg"
            className="download-btn"
            href={downloadableImgUrl}
          >
            Download as Image
          </a>
        )}
      </div>
    </header>
  );
};
