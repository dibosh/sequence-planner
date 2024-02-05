export const Body = ({
  rows,
  columns,
  spans,
  headerLabels,
  segmentPerColumn,
}) => {
  const segmentedColIndex = (mainColIndex, segment, segmentPerColumn) =>
    mainColIndex * segmentPerColumn + segment;

  const boundValueWithinRange = (value, end) =>
    value < 0 ? 0 : value >= end ? end - 1 : value;

  return (
    <>
      {rows.map((_, idx) => {
        let {
          label,
          color,
          spanStartCol,
          spanEndCol,
          spanStartSegment,
          spanEndSegment,
        } = (spans.length > 0 && spans[idx]) || {};

        spanStartCol = boundValueWithinRange(spanStartCol, headerLabels.length);
        spanEndCol = boundValueWithinRange(spanEndCol, headerLabels.length);

        const spanStartIdx =
          spanStartCol >= 0 && spanStartSegment >= 0
            ? segmentedColIndex(
                spanStartCol,
                spanStartSegment,
                segmentPerColumn,
              )
            : -1;

        const spanEndIdx =
          spanEndCol >= 0 && spanEndSegment >= 0
            ? segmentedColIndex(spanEndCol, spanEndSegment, segmentPerColumn)
            : -1;

        const spanLength = spanEndIdx - spanStartIdx + 1;

        return (
          <tr key={idx}>
            <td className="segment-column item-title">{label || '--'}</td>
            <td className="segment-column">--</td>

            {columns.map((_, idx) => {
              const shouldShowSpan = idx >= spanStartIdx && idx <= spanEndIdx;
              const isStartOfSpan = idx === spanStartIdx;
              const isEndOfSpan = idx === spanEndIdx;
              const spanClass = `span-segment ${
                isStartOfSpan ? 'span-start' : isEndOfSpan ? 'span-end' : ''
              }`;
              const midIdx = Math.floor((spanEndIdx + spanStartIdx) / 2);

              return (
                <td className="segment-column">
                  {shouldShowSpan && (
                    <div
                      className={spanClass}
                      style={color && { backgroundColor: color }}
                    >
                      {midIdx === idx && spanLength}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};
