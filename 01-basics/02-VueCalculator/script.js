import { createApp } from './vendor/vue.esm-browser.js';

const App = {
  data() {
    return {
      operandX: 0,
      operandY: 0,
      operator: 'sum',
    };
  },

  computed: {
    result() {
      return this[this.operator](this.operandX, this.operandY);
    },
  },

  methods: {
    sum(x, y) {
      return x + y;
    },

    subtract(x, y) {
      return x - y;
    },

    multiply(x, y) {
      return x * y;
    },

    divide(x, y) {
      return x / y;
    },
  }
};

createApp(App).mount('#app');
