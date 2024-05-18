export const SegmentHeader = ({ segmentLabels = [], columns = [] }) => {
  return (
    <tr className="subheader">
      {/* subheader containing segment labels */}
      <td>--</td>
      {columns.map((_, idx) => (
        <td className="segment-label" key={idx}>
          {segmentLabels[idx % segmentLabels.length]}
        </td>
      ))}
    </tr>
  );
};
