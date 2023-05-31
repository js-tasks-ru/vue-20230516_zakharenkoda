import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';

const States = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default defineComponent({
  name: 'PageMeetup',

  States,

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      state: States.IDLE,
      meetup: null,
      error: null,
    };
  },

  watch: {
    meetupId() {
      this.fetchMeetup();
    },
  },

  mounted() {
    this.fetchMeetup();
  },

  methods: {
    async fetchMeetup() {
      // Переходим в состояние загрузки. Чистим данные и ошибку
      this.state = States.LOADING;
      this.meetup = null;
      this.error = null;

      try {
        this.meetup = await fetchMeetupById(this.meetupId);
        // Данные успешно получены
        this.state = States.SUCCESS;
      } catch (error) {
        // Произошла ошибка при получении данных
        this.state = States.ERROR;
        this.error = error.message;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="state === $options.States.SUCCESS" :meetup="meetup" />

      <UiContainer v-if="state === $options.States.LOADING">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="state === $options.States.ERROR">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
