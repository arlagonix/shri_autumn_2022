function renderWaterfall(rootNode, columnCount, elementGap) {
  const textElementsAmount = rootNode.children.length;
  const columnElements = [];
  const columnScores = new Array(columnCount).fill(0);
  const columnWidth = Math.floor(
    (rootNode.offsetWidth - elementGap * (columnCount - 1)) / columnCount
  );

  rootNode.style.display = "flex";
  // rootNode.style.gap = `${elementGap}px`;
  // rootNode.style.maxWidth = `100%`;

  for (let i = 1; i <= columnCount; i++) {
    const columnContainer = document.createElement("div");

    columnContainer.style.display = "flex";
    columnContainer.style.flexDirection = "column";
    columnContainer.style.flexBasis = `${columnWidth}px`;
    columnContainer.style.gap = `${elementGap}px`;
    if (i !== columnCount) {
      columnContainer.style.marginRight = `${elementGap}px`;
    }

    columnElements.push(columnContainer);
  }

  for (let i = 1; i <= textElementsAmount; i++) {
    const columnIndexToAppendElement = columnScores.indexOf(
      Math.min(...columnScores)
    );
    columnScores[columnIndexToAppendElement] +=
      rootNode.children[0].textContent.length;
    columnElements[columnIndexToAppendElement].appendChild(
      rootNode.children[0]
    );
  }

  for (column of columnElements) {
    rootNode.appendChild(column);
  }
}
