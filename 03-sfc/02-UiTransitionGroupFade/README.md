# UiTransitionGroupFade

`scoped` стили не действуют, так как классы устанавливаются не на элементы компонента, а на его содержимое, переданное
через слот. Лучшим решением тут было бы использовать `:slotted()` псевдо-класс. К сожалению, на момент добавления задачи
он всё ещё не работает в `<TransitionGroup>` компоненте.

Остаётся использовать `:deep()` псевдо-класс. Такие стили будут действовать во всём поддереве компонента, но хотя бы не
будут глобальными на весь документ.

Полное решение:

```html
<template>
  <TransitionGroup :tag="tag" name="fade-list" class="fade-list">
    <slot />
  </TransitionGroup>
</template>

<script>
  export default {
    name: 'UiTransitionGroupFade',

    props: {
      tag: {
        type: [String, Object, Function],
        default: 'div',
      },
    },
  };
</script>

<style scoped>
  /* _transitions.css */

  .fade-list {
    position: relative;
  }

  .fade-list > :deep(*) {
    opacity: 1;
    transition: opacity 0.3s ease-out;
  }

  .fade-list :deep(.fade-list-leave-active) {
    position: absolute !important;
    left: 0;
    right: 0;
  }

  .fade-list :deep(.fade-list-enter-from),
  .fade-list :deep(.fade-list-leave-to) {
    opacity: 0;
  }

  .fade-list :deep(.fade-list-move) {
    transition: transform 0.3s;
  }
</style>
```
