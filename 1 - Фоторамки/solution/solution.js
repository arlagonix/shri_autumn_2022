module.exports = function solution(n, width, height) {
  const result = [];

  const columnAmount = Math.ceil(Math.sqrt(n));
  const columnWidth = Math.round(width / columnAmount);

  const rowAmount = Math.ceil(n / columnAmount);
  const rowHeight = Math.round((columnWidth * height) / width);

  const firstRowColumnAmount =
    n % columnAmount === 0 ? columnAmount : n % columnAmount;
  const firstRowLeftOffset = Math.trunc(
    (width - firstRowColumnAmount * columnWidth) / 2
  );

  const firstRowTopOffset = Math.trunc((height - rowAmount * rowHeight) / 2);

  for (let col = 1; col <= firstRowColumnAmount; col++) {
    const x = Math.round(
      firstRowLeftOffset + columnWidth / 2 + columnWidth * (col - 1)
    );
    const y = firstRowTopOffset;
    result.push({
      width: columnWidth,
      height: rowHeight,
      x: x,
      y: y,
    });
  }

  for (let row = 2; row <= rowAmount; row++) {
    for (let col = 1; col <= columnAmount; col++) {
      const x = Math.round(columnWidth / 2 + columnWidth * (col - 1));
      const y = Math.round(firstRowTopOffset + rowHeight * (row - 1));
      result.push({
        width: columnWidth,
        height: rowHeight,
        x: x,
        y: y,
      });
    }
  }

  return result;
};
