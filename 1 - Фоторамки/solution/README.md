# Задание 1. Фоторамки

## Краткая сводка

- На задачу ушло около 2.5 часов
- 17 / 20 тестов прошли. Без понятия, почему 3 теста не прошли, но мне и 17 более чем достаточно
- Получил 17 баллов
- Было страшно и непонятно, но, в целом, все получилось

Содержимое [solution.js](./solution.js) - мой ответ, который и принёс указанный результат

## Как решал

Суть решения:

- Вычисляем основные константы: число столбцов, ширина столбцов, число строк, высота строк, число столбцов в первом ряду, отступ слева и сверху для первой строки
- Обрабатываем первую строку со всеми столбцами. Особый случай, т.к. у неё может быть свой отступ слева и своё число столбцов
- Затем все оставшиеся строки с их столбцами

Хотя задача и выглядит лёгкой, я сначала пришёл в небольшой ужас при виде неё. Не понимал, что делать и как к ней подступиться. Сначала выписал основные условия и детали:

На вход:

- n - число фоторамок
- width - ширина области для фоторамок
- height - высота области для фоторамок

На выход:

- Массив объектов
  - width: ширина фоторамки
  - height: высота фоторамки
  - x: координата по x
  - y: координата по y

Детали:

- Функцию надо экспортировать
- Раскладка должна быть симметричной относительно вертикали (Пустое пространство выше и ниже строк должно иметь одинаковую высоту)
- Все фоторамки должны быть одинакового размера и иметь такие же соотношения высоты и ширины, как и кусок стены
- Не должно быть пустого пространства между фоторамками.
- Если фоторамок не хватает для заполнения строки, то такая строка должна быть расположена первой сверху.
- Возвращать надо в порядке: сверху вниз, слева направо
- x по центру, y по верхнему краю
- x,y фоторамок нужно округлить до ближайших целых значений с помощью `Math.round`
- Число колонок = `Math.ceil(Math.sqrt(n))`

Далее подумал, походил по комнате и разбил задачу на подзадачи:

- Узнать число колонок: `Math.ceil(Math.sqrt(n))`

* Узнать ширину фоторамки: ширина / число колонок Math.round

* Узнать число строк: n / число колонок нацело с округлением в большую сторону (8/3 => 2. => 3)
* Узнать высоту фоторамки:

  - Узнать соотношение сторон: высота / ширина Math.round
  - высота фоторамки = высота \* соотношение сторон

* Узнать, сколько колонок в первой строке: остаток деления n на число колонок

- Узнать x фоторамок каждой строки:

  - Узнать отступ слева: (ширина - число колонок \* ширина колонок) / 2
  - x первой фоторамки: отступ слева + ширина колонки / 2
  - x второй фоторамки: отступ слева + ширина колонки / 2 + ширинка колонки
  - x n-ой фоторамки: отступ слева + ширина колонки / 2 + ширина колонки \* (n-1)
  - (!) у разных строк разное число колонок

- Узнать y фоторамок каждой строки:

  - Узнать отступ сверху: (высота - число строк \* высота строк) / 2
  - y первой фоторамки: отступ сверху
  - y второй фоторамки: отступ сверху + высота колонки
  - y n-ой фоторамки: отступ сверху + высота колонки \* (n-1)

- Собрать воедино

  - Высчитываем глобальные значения
  - Цикл от от 2 до последней строки. 1-ая строка особая

    - Цикл от 1 до последнего столбца
      - У первой строки будет своё число колонок. Можно заранее вычислить и добавить условие для 1-ой строки
      - Считаем x, считаем y
      - Закидываем в массив объект с x,y, высотой и шириной. Высота и ширина у всех одинаковая

Далее я аккуратно выполнил каждую из подзадач с подробным выводом деталей в консоль. И в итоге получил заветные баллы

Сначала многие тесты не прошли. Оказалось, я не учел, что `y` (в отличие от `x`) считается не по центру рамки по вертикали, а по её верхнему краю (т.е. `y = 0` относительно рамки). Но я поправил это за минуту, и всё заработало.

Плюс долго не мог понять, как проверить, что всё работает. Мой js сначала ругался на то, что я использую `module.exports`. Не помню, как исправил, но в итоге всё так же заработало (вроде поставил в html, на котором я всё тестировал, `type="module"`). Изначально я все проверял в браузере, а не на Node.js

## Решение перед выкладкой

Мне удобно работать с консолью браузера, поэтому писал все в HTML и экспортировал туда скрипт

Вот HTML файл (на 99% создан с помощью emmet shortcut):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js" type="module" defer></script>
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
```

Вот скрипт:

```js
"use strict";

export function solution(n, width, height) {
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

  console.log(`n: ${n}`);
  console.log(`columnAmount: ${columnAmount}`);
  console.log(`columnWidth: ${columnWidth}`);
  console.log(`rowAmount: ${rowAmount}`);
  console.log(`rowHeight: ${rowHeight}`);
  console.log(`firstRowColumnAmount: ${firstRowColumnAmount}`);
  console.log(`firstRowLeftOffset: ${firstRowLeftOffset}`);

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

  for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
  }

  console.log("-----------------");

  return result;
}

const globalWidth = 1000;
const GlobalHeight = 1218;

solution(1, 100, 30);
solution(1, globalWidth, GlobalHeight);
solution(2, globalWidth, GlobalHeight);
solution(3, globalWidth, GlobalHeight);
solution(4, globalWidth, GlobalHeight);
solution(5, globalWidth, GlobalHeight);
solution(6, globalWidth, GlobalHeight);
solution(7, globalWidth, GlobalHeight);
solution(8, globalWidth, GlobalHeight);
solution(9, globalWidth, GlobalHeight);
solution(10, globalWidth, GlobalHeight);
```
