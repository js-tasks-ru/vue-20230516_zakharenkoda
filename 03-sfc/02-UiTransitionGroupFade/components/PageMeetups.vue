<template>
  <UiContainer>
    <div class="filters-panel">
      <div class="filters-panel__col">
        <UiRadioGroup v-model="filter.date" :options="$options.dateFilterOptions" name="date" />
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group_inline">
          <div class="input-group input-group_icon input-group_icon-left">
            <div class="input-group__icon">
              <UiIcon icon="search" />
            </div>

            <input
              v-model.trim="filter.search"
              class="form-control form-control_rounded form-control_sm"
              placeholder="Поиск"
              type="search"
            />
          </div>
        </div>
        <div class="form-group form-group_inline">
          <UiButtonGroup v-model:view="view" />
        </div>
      </div>
    </div>

    <UiTransitionFade>
      <template v-if="meetups">
        <template v-if="filteredMeetups.length">
          <MeetupsList v-if="view === 'list'" :meetups="filteredMeetups" />
          <MeetupsCalendar v-else-if="view === 'calendar'" :meetups="filteredMeetups" />
        </template>
        <UiAlert v-else>Митапов по заданным условиям не найдено...</UiAlert>
      </template>
      <UiAlert v-else>Загрузка...</UiAlert>
    </UiTransitionFade>
  </UiContainer>
</template>

<script>
import MeetupsList from '../components/MeetupsList';
import MeetupsCalendar from '../components/MeetupsCalendar';
import UiRadioGroup from '../components/UiRadioGroup';
import UiButtonGroup from '../components/UiButtonGroup';
import UiContainer from '../components/UiContainer';
import UiAlert from '../components/UiAlert';
import UiIcon from '../components/UiIcon';
import UiTransitionFade from './UiTransitionFade.vue';
import { fetchMeetups } from '../api';

export default {
  name: 'PageMeetups',

  dateFilterOptions: [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ],

  components: {
    UiTransitionFade,
    UiIcon,
    MeetupsList,
    MeetupsCalendar,
    UiRadioGroup,
    UiButtonGroup,
    UiContainer,
    UiAlert,
  },

  data() {
    return {
      meetups: null,

      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },

      view: 'list',
    };
  },

  computed: {
    filteredMeetups() {
      const dateFilter = (meetup) =>
        this.filter.date === 'all' ||
        (this.filter.date === 'past' && new Date(meetup.date) <= new Date()) ||
        (this.filter.date === 'future' && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.filter.participation === 'all' ||
        (this.filter.participation === 'organizing' && meetup.organizing) ||
        (this.filter.participation === 'attending' && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());

      return this.meetups.filter((meetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup));
    },
  },

  mounted() {
    fetchMeetups().then((meetups) => {
      this.meetups = meetups;
    });
  },
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}
</style>
