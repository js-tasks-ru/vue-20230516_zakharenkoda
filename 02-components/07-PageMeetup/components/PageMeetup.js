import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      isLoading: false,
      loadingDataError: '',
    };
  },

  watch: {
    meetupId: {
      handler(newValue) {
        this.fetchData(newValue);
      },
      immediate: true,
    }
  },

  methods: {
    fetchData(id) {
      this.loadingDataError = '';
      this.isLoading = true;
      this.meetup = null;

      fetchMeetupById(id)
        .then((data) => {
          this.meetup = data;
        })
        .catch((error) => {
          this.loadingDataError = error.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup && !isLoading" :meetup="meetup" />

      <UiContainer v-if="isLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="loadingDataError">
        <UiAlert>{{ loadingDataError }}</UiAlert>
      </UiContainer>
    </div>`,
});
