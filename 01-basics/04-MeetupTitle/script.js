import { createApp } from '../03-MarkedList/vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

const App = {
  data() {
    return {
      currentMeetupId: null,
      meetup: null,
    };
  },

  watch: {
    currentMeetupId(newValue) {
      this.fetchMeetupById(newValue)
        .then((data) => this.meetup = data);
    }
  },

  methods: {
    fetchMeetupById(meetupId) {
      return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      });
    }
  }
};

createApp(App).mount('#app');
