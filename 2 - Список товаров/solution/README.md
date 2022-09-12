# Задание 2. Список товаров

## Краткая сводка

- На задачу ушло где-то 1.5 часа
- 1 / 1 тестов прошёл
- Получил 10 баллов
- Было легко, самая приятная задача

Содержимое [solution.js](./solution.js) - мой ответ, который и принёс указанный результат

## Как решал

Суть решения:

- Открыть Figma
- Сверстать страницу
- Отправить решение

Доп. время потратил на то, чтобы сделать всё pixel perfect.

Использовал !important 1 раз, чтобы перебить их `margin: 0, padding: 0` в inline стилях

Плюс сделал все с использованием BEM, поэкспериментировал с переменными. Один слой переменных для глобальных цветов, другой слой переменных для поэлементных цветов. Зачем? Из любопытства

## Решение перед выкладкой

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <link rel="stylesheet" href="styles.css" /> -->
  </head>
  <body>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
      }

      :root {
        --color--main-1: black;
        --color--main-2: white;
        --color-secondary-1: #c4c4c4;
        --color-secondary-2: #f8f8f8;
        --font-main-1: "Inter", sans-serif;

        /* --------------------- */

        --background-color: var(--color--main-2);

        --header--font: var(--font-main-1);
        --header--color_text: var(--color--main-1);

        --card--color_background: var(--color-secondary-2);
        --card__image--color_background: var(--color-secondary-1);

        --button--color_background: var(--color--main-2);
        --button--color_text: var(--color--main-1);
        --button--font: var(--font-main-1);
      }

      body {
        padding: 1rem !important; /* 16px */
        background: var(--background-color);
      }

      .header {
        font-family: var(--header--font);
        color: var(--header--color_text);
        font-size: 1.125rem; /* 18px */
        line-height: 1.375rem; /* 22px */
        font-weight: 400;
      }

      .card-list {
        margin-top: 1rem; /* 16px */
        display: flex;
        gap: 1rem; /* 16px */
      }

      .card {
        background: var(--card--color_background);
        border-radius: 1.5rem; /* 24px */
        padding: 1rem; /* 16px */
        display: flex;
        flex-direction: column;
        gap: 1rem; /* 16px */
      }

      .card__image {
        background: var(--card__image--color_background);
        height: 138px;
        width: 100%;
        border-radius: 1rem; /* 16px */
      }

      .button {
        color: var(--button--color_text);
        background: var(--button--color_background);
        font-family: var(--button--font);

        font-weight: 400;
        font-size: 0.75rem; /* 12px */
        line-height: 0.938rem; /* 15px */

        border: none;
        border-radius: 0.625rem; /* 10px */
        padding: 0.625rem 3.375rem; /* 10px 54px */
      }
    </style>
    <header>
      <h1 class="header">Список товаров</h1>
    </header>
    <main class="card-list">
      <article class="card">
        <div class="card__image"></div>
        <button class="button">Купить</button>
      </article>
      <article class="card">
        <div class="card__image"></div>
        <button class="button">Купить</button>
      </article>
      <article class="card">
        <div class="card__image"></div>
        <button class="button">Купить</button>
      </article>
    </main>
  </body>
</html>
```
