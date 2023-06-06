# UiTransitionGroupFade

👷🏻 _Задача нормальной сложности_\
💼 _Часть проекта_

<!--start_statement-->

Во Vue есть два встроенных компонента для анимации переходов:

- `<Transition>` - для анимации появления/исчезновения, например, с `v-if/v-show`
- `<TransitionGroup>` - для анимации списков с `v-for`

Для использования этих компонентов требуется описать стили анимаций с классами в определённом формате. Например:

```html
<template>
  <!-- Имя - fade -->
  <Transiton name="fade">
    <div v-if="showDiv">Div</div>
  </Transiton>
</template>

<style scoped>
  /* Определённые классы префиксом fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
```

Документация компонентов: https://vuejs.org/guide/built-ins/transition.html

Часто в проекте используются одни и те же анимации. Добавлять для этого одни и те же классы в компоненты плохо - scoped
стили будут дублироваться - каждый новый компонент с анимацией будет иметь свою копию стилей для них. Можно делать
глобальные стили для анимаций, но теряется инкапсуляция. Решение - создать специальные компоненты с конкретной
анимацией.

Созданы два компонента с fade анимацией:

1. `UiTransitionFade` - выводящий содержимое в `<Transition>` с fade анимацией (используется в `<PageMeetups>`)
2. `UiTransitionGroupFade` - выводящий содержимое в `<TransitionGroup>` с fade анимацией (используется в
   `<MeetupsList>`)

К сожалению, `UiTransitionGroupFade` работает только с глобальными стилями...

**Задача:** заставьте компонент работать со **scoped** стилями.

<details>
  <summary><strong>⚠️ Спойлер о возможной проблеме в решении - смотрите, если ваше решение должно работать, но не работает</strong></summary>

Пока не исправлен [баг работы slotted в TransitionGroup](https://github.com/vuejs/core/issues/7532), для решения этой
задачи не получится использовать псевдо-класс `:slotted()`.

</details>

<img src="https://i.imgur.com/BdOI9mw.gif" alt="Example" style="max-width: 100%" />

<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/UiTransitionGroupFade.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;\
приложение будет доступно на [http://localhost:8080/03-sfc/02-UiTransitionGroupFade/](http://localhost:8080/03-sfc/02-UiTransitionGroupFade/).

✅ Доступно автоматическое тестирование: `npm test UiTransitionGroupFade`.
