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

  const spanBorderRadius = 8;
  const transparentColor = 'transparent';

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

        let isSpanClosed = false;

        return (
          <tr key={idx}>
            <td className="segment-column">{label || '--'}</td>
            <td className="segment-column">--</td>

            {columns.map((_, idx) => {
              const style = {
                backgroundColor: '#fff',
              };

              if (
                idx >= spanStartIdx &&
                idx <= spanEndIdx &&
                color &&
                !isSpanClosed
              ) {
                style.backgroundColor = color;

                if (idx !== spanEndIdx) {
                  style.borderRightColor = transparentColor;
                }

                if (idx === spanStartIdx) {
                  style.borderTopLeftRadius = spanBorderRadius;
                  style.borderBottomLeftRadius = spanBorderRadius;
                }

                if (idx === spanEndIdx) {
                  isSpanClosed = true;
                  style.borderTopRightRadius = spanBorderRadius;
                  style.borderBottomRightRadius = spanBorderRadius;
                  style.borderLeftColor = transparentColor;
                }
              }

              return <td className="segment-column" style={style}></td>;
            })}
          </tr>
        );
      })}
    </>
  );
};
