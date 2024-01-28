export const SegmentHeader = ({ segmentLabels = [], columns = [] }) => {
  return (
    <tr className="subheader">
      {/* subheader containing segment labels */}
      <td>--</td>
      <td>--</td>
      {columns.map((_, idx) => (
        <td className="segment-label">
          {segmentLabels[idx % segmentLabels.length]}
        </td>
      ))}
    </tr>
  );
};
