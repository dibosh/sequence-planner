import { SegmentHeader } from './segment-header';
import { Body } from './body';

import './styles.css';

export const GanttChart = ({
  id = '',
  className = '',
  headerLabels = [],
  segmentPerColumn = 2,
  segmentLabels = ['A', 'B'],
  initialRowCount = 12,
  rowSpans = [],
}) => {
  if (headerLabels.length === 0) {
    return <p>Nothing to load.</p>;
  }

  if (segmentLabels.length !== segmentPerColumn) {
    return <p>Must provide segment label for each segment.</p>;
  }

  const totalRowCount = Math.max(rowSpans.length, initialRowCount);
  const rowFiller = Array(totalRowCount).fill('');
  const colFiller = Array(headerLabels.length * segmentPerColumn).fill('');

  return (
    <table id={id} className={className}>
      <thead className="header">
        <tr>
          <th>Items</th>
          {headerLabels.map((label) => (
            <th colSpan="2" key={label}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <SegmentHeader columns={colFiller} segmentLabels={segmentLabels} />
        <Body
          rows={rowFiller}
          columns={colFiller}
          spans={rowSpans}
          segmentPerColumn={segmentPerColumn}
          headerLabels={headerLabels}
        />
      </tbody>
    </table>
  );
};
