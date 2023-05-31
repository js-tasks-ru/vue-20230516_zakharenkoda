import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
    },

    image: {
      type: String,
    },
  },

  template: `
    <div class="meetup-cover" :style="image && \`--bg-url: url('\${image}')\`">
        <!-- Ссылка выше - пример верстки при наличии изображения, а не изображение по умолчанию. -->
        <!-- Изображение по умолчанию уже есть в стилях. Для его вывода достаточно не добавлять никаких стилей. -->
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
