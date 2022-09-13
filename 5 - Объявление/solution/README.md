# Задание 5. Объявления

## Краткая сводка

- На задачу потратил все 3 часа
- Завалил все 8 тестов
- Получил 0 баллов
- Задача интересная, считаю, что полностью её выполнил, хоть и завалил тесты

Содержимое [solution.js](./solution.js) - мой ответ, который и принёс указанный результат

## Как решал

Суть решения:

- Переместил дочерние элементы rootNode в созданные div'ы. Число div'ов = числу колонок
- Вычислил ширину каждого столбца
- Далее раскидал элементы по div'ам. У каждого столбца было свое числовое значение = общее число символов всех элементов столбца. Изначально оно равно 0 у каждого столбца. Добавлял элемент только в столбец с мин. числом символов в столбце, потом увеличивал числовое значение столбца на число символов (length) этого элемента
- Накинул rootNode `display: flex`. Судя по правилам, это не запрещено
- Каждому такому div'у накинул `display:flex; flex-direction: column;`, задал `gap`, `flexBasis`
- Для расстояний между колонками использовал сначала `margin-right` - у всех div'ов кроме последнего. Потом убрал `margin-right`, использовал `gap` на `rootNode`: тестам пофигу, все проваливались

Почему тесты провалились? Черт его знает. Проверил даже на их примере - с помощью сервиса считал с их примера-изображения все символы, перенес в свой HTML, прогнал через код - все отображалось точно так, как на картинке.

Самое неприятное, что узнал, пока решал, - это то, что `rootNode.children` - динамический объект. Много багов из-за этого было. Я и раньше знал, что он динамически изменяется, когда добавляешь, удаляешь элементы, но не учел этого сначала.

## Решение перед выкладкой

```js
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
```
