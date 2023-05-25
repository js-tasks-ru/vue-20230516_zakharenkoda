import { createApp } from './vendor/vue.esm-browser.js';

const App = {
  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    increaseCounter() {
      this.counter += 1;
    },
  },
};

createApp(App).mount('#app');
