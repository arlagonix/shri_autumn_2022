# Задание 6. Drag and Drop

## Краткая сводка

- На задачу потратил все 3 часа
- Прошел 10 / 12 тестов
- Получил 25 баллов
- Задача казалась невероятно сложной. Безумно удивился, что прошёл почти все тесты

Содержимое [solution.html](./solution.html) - мой ответ, который и принёс указанный результат

## Как решал

Суть решения:

- [Открыл W3C Drag and Drop](https://www.w3schools.com/html/html5_draganddrop.asp) гайд. Почитал, попробовал применить в коде, закрыл
- [Открыл MDN Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) гайд, поковырял документацию, что-то перенес в код, тут пошаманил, там подкрутил
- В итоге, получил 25 баллов

Самое забавное, что перед началом решения был на 100% уверен, что завалю все тесты, как и с 3,5 задачами. Представьте мою радость, когда я без особой надежды закинул решение и оно прошло все тесты. Словами это трудно будет передать.

При dragstart сохраняем `data-tag-id`. При dragstart передаем `data-tag-id`. При drop берем из ивента `data-letter-id` элемента, в который делают drop, добавляем в data, только если это не дубликат. На дубликат проверяем через `includes`. Потом перерендериваем всю страницу с помощью `buildHtml()`

Почему-то при перендеривании все eventListener перестают listen event'ы, поэтому перед перендериванием все старые eventListener'ы сношу и после перерендеринга заново навешиваю. Думаю, это из-за того, что все DOM элементы обновляются. Но как по мне мое решение похоже на костыль.

Потом добавил немного стилей - на тег при перетаскивании, на зону письма при dragover. Когда начинаем перетаскивать, добавляем класс `classList.add`. Когда заканчиваем - убираем `classList.remove`. Они уже создали этот класс. Аналогично для зоны письма

На перетаскивание тега в другие письма и в зону тегов времени не хватило. Но там процесс аналогичный. Отличие в том, что когда срабатывает флаг того, что можно дропать тег на письмо или в зону тегов, кидаем класс с `display: none` на тег в письме, из которого перетаскивали, удаляем из `data` `id` этого тега данного письма, добавляем его в список тегов другого письма (если переносим на письмо) и перерендериваем.

В целом, Yandex тут опять процентов 60-70 кода написали, поэтому если разобраться в нем, окажется, что осталось сделать совсем не так много.

## Решение перед выкладкой

Такое же, как и при выкладке

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Почта с тегами</title>
    <meta charset="utf-8" />
    <style>
      .Page {
        font-family: Arial;
        font-size: 12px;
        margin: 0;
        padding: 0;
        color: #2f2d33;
      }
      .Logo {
        font-size: 24px;
        padding: 12px;
        margin: 0;
      }
      .Main {
        display: flex;
      }
      .Tags {
        width: 25%;
        background-color: #fffae5;
        padding: 6px;
      }
      .Tags_dropzone {
        background-color: #ffedba;
      }
      .Tags_dragovered {
        background-color: #ffd98e;
      }
      .Tags_dragovered * {
        pointer-events: none;
      }
      .Tag {
        background-color: #ffc062;
        color: #592400;
        margin: 6px;
        padding: 6px;
        display: inline-block;
        cursor: grab;
      }
      .Tag:active {
        cursor: grabbing;
      }
      .Tag_dragged {
        background-color: #ff9100;
      }
      .Tag_removed {
        display: none;
      }
      .Letters {
        width: 100%;
        background-color: #91cfff;
      }
      .Letters_dropzone {
        background-color: #4da0ff;
      }
      .Letter {
        display: flex;
        color: #00244d;
      }
      .Letter_dragovered {
        background-color: #006fed;
        cursor: grabbing;
      }
      .Letter_dragovered * {
        pointer-events: none;
      }
      .Letter__Title {
        margin: 12px;
      }
    </style>
  </head>

  <body class="Page">
    <script>
      let data = window.data || {
        tags: {
          1: "важное",
          2: "личное",
          3: "рабочее",
          4: "Проект X",
          5: "Проект Y",
        },
        letters: [
          {
            id: "1",
            title: "Приглашение на день рождения",
            tags: ["1", "2"],
          },
          {
            id: "2",
            title: "Ответ на ваш комментарий",
            tags: ["2"],
          },
          {
            id: "3",
            title: "Резюме последней встречи про X",
            tags: ["3", "4"],
          },
          {
            id: "4",
            title: "Расчётный лист",
            tags: ["1", "3"],
          },
          {
            id: "5",
            title: "Нужна помощь с Y",
            tags: ["3", "5"],
          },
          {
            id: "6",
            title: "Регулярная рассылка для клиентов",
            tags: [],
          },
        ],
      };

      function mapAndJoin(a, f, s = "") {
        return a.map(f).join(s);
      }
      function buildHtml(data) {
        return `
      <div class="Main">
        <div class="Tags">
          ${mapAndJoin(Object.entries(data.tags), ([id, title]) =>
            buildTagHtml(id, title)
          )}
        </div>
        <div class="Letters">
          ${mapAndJoin(
            data.letters,
            ({ id, title, tags }) => `
              <div class="Letter" data-letter-id="${id}">
                <div class="Letter__Title">${title}</div>
                ${mapAndJoin(tags, (l) => buildTagHtml(l, data.tags[l]))}
              </div>
            `
          )}
        </div>
      </div>
    `;
      }
      function buildTagHtml(id, title) {
        return `<div class="Tag" data-tag-id="${id}">${title}</div>`;
      }
      document.body.innerHTML = buildHtml(data);
      // Write below

      function dragstart_handler(ev) {
        this.classList.add("Tag_dragged");
        ev.dataTransfer.setData(
          "text/plain",
          ev.target.attributes["data-tag-id"].nodeValue
        );
        // ev.dataTransfer.dropEffect = "move";
      }

      function dragend_handler(ev) {
        this.classList.remove("Tag_dragged");
      }

      function dragleave_handler(ev) {
        this.classList.remove("Letter_dragovered");
      }

      function dragover_handler(ev) {
        this.classList.add("Letter_dragovered");
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
      }

      function drop_handler(ev) {
        ev.preventDefault();
        const transferedData = ev.dataTransfer.getData("text/plain");
        const letterId = this.attributes["data-letter-id"].nodeValue;

        // Да, говнокод и не надо так делать. Но время сжато, увы
        if (!data.letters[+letterId - 1].tags.includes(transferedData)) {
          data.letters[+letterId - 1].tags.push(transferedData);
          refreshContents();
        }
      }

      function refreshContents() {
        removeEventListenersOnTags();
        document.body.innerHTML = buildHtml(data);
        launchEventListenersOnTags();
      }

      function launchEventListenersOnTags() {
        // Event listeners for tags
        for (let key of Object.keys(data.tags)) {
          const tagElement = document.querySelector(
            `.Tag[data-tag-id="${key}"]`
          );
          tagElement.addEventListener("dragstart", dragstart_handler);
          tagElement.addEventListener("dragend", dragend_handler);
          tagElement.draggable = "true";
        }
        // Event listeners for letters
        for (let letter of data.letters) {
          const letterElement = document.querySelector(
            `.Letter[data-letter-id="${letter.id}"]`
          );
          letterElement.addEventListener("dragover", dragover_handler);
          letterElement.addEventListener("dragleave", dragleave_handler);
          letterElement.addEventListener("drop", drop_handler);
        }
      }

      function removeEventListenersOnTags() {
        for (let key of Object.keys(data.tags)) {
          document
            .querySelector(`.Tag[data-tag-id="${key}"]`)
            .removeEventListener("dragstart", dragstart_handler);

          document.querySelector(`.Tag[data-tag-id="${key}"]`).draggable =
            "false";
        }
        for (let letter of data.letters) {
          const letterElement = document.querySelector(
            `.Letter[data-letter-id="${letter.id}"]`
          );
          letterElement.removeEventListener("dragover", dragover_handler);
          letterElement.removeEventListener("dragleave", dragleave_handler);
          letterElement.removeEventListener("drop", drop_handler);
        }
      }

      launchEventListenersOnTags();

      // Write above
      window.onSolutionReady && window.onSolutionReady();
    </script>
  </body>
</html>
```
