import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: [
    'update:count'
  ],

  methods: {
    increaseCount() {
      const newCount = this.count + 1;

      this.$emit('update:count', newCount);
    },
  },

  template: `<button type="button" @click="increaseCount">{{ count }}</button>`,
});
