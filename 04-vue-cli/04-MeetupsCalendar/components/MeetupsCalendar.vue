<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="setPreviousMonth"
        />
        <div class="calendar-view__date">{{ localeDate }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="setNextMonth"
        />
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="item in calendarWithMeetupsItems"
        :key="item.date"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': item.inactive }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ item.dayOfMonth }}</div>
        <div class="calendar-view__cell-content">
          <a
            v-for="meetup in item.meetups"
            href="/meetups/1"
            class="calendar-event"
          >
            {{ meetup.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

const DAYS_IN_WEEK_COUNT = 7;
const DAY_IN_WEAK_OFFSET = 1;
const MONDAY = 1;
const SUNDAY = 0;

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    currentDateMonth() {
      return this.date.getMonth();
    },

    daysInMonth() {
      return dayjs(this.date).daysInMonth();
    },

    previousMonthCalendarItems() {
      const firstDayOfWeekInCurrentMonth = dayjs(this.date).date(1).day();

      if (firstDayOfWeekInCurrentMonth === MONDAY) {
        return [];
      }

      const previousMonthVisibleDayCount = firstDayOfWeekInCurrentMonth === SUNDAY ?
        DAYS_IN_WEEK_COUNT - DAY_IN_WEAK_OFFSET
        : firstDayOfWeekInCurrentMonth - DAY_IN_WEAK_OFFSET;
      const previousMonth = dayjs(this.date).subtract(1, 'month');
      const previousMonthDayCount = previousMonth.daysInMonth();
      const previousMonthLastDay = previousMonth.date(previousMonthDayCount);
      const previousMonthFirstDayOfLastWeak = previousMonthLastDay.day(1);
      const previousMothFirstDayOfLastWeakDate = previousMonthFirstDayOfLastWeak.date();
      const startDate = previousMonth.date(previousMothFirstDayOfLastWeakDate);

      return this.generateCalendarItems(previousMonthVisibleDayCount, startDate);
    },

    currentMonthCalendarItems() {
      const startDate = dayjs(this.date).date(1);

      return this.generateCalendarItems(this.daysInMonth, startDate);
    },

    nextMonthCalendarItems() {
      const currentMonthDayCount = this.daysInMonth;
      const lastDayOfWeekInCurrentMonth = dayjs(this.date).date(currentMonthDayCount).day();

      if (lastDayOfWeekInCurrentMonth === SUNDAY) {
        return [];
      }

      const nextMonth = dayjs(this.date).add(1, 'month');
      const nextMonthFirstDay = nextMonth.date(1).day();
      const nextMonthVisibleDayCount = nextMonthFirstDay !== SUNDAY ?
        DAYS_IN_WEEK_COUNT - nextMonthFirstDay + DAY_IN_WEAK_OFFSET
        : 1;
      const startDate = nextMonth.date(1);

      return this.generateCalendarItems(nextMonthVisibleDayCount, startDate);
    },

    calendarItems() {
      return [
        ...this.previousMonthCalendarItems,
        ...this.currentMonthCalendarItems,
        ...this.nextMonthCalendarItems,
      ];
    },

    calendarWithMeetupsItems() {
      const getCurrentDateMeetups = (date) => {
        return this.meetups.filter((meetup) => {
          const dayDifferenceCount = dayjs(meetup.date).diff(date, 'day');

          return dayDifferenceCount === 0;
        });
      };

      return this.calendarItems.map((date) => {
        const currentMeetups = getCurrentDateMeetups(date);
        const calendarItemDate = dayjs(date);
        const dayOfMonth = calendarItemDate.format('D');
        const inactive = calendarItemDate.month() !== this.currentDateMonth;

        return {
          date,
          dayOfMonth,
          inactive,
          meetups: [...currentMeetups],
        };
      });
    },

    localeDate() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
  },

  methods: {
    setPreviousMonth() {
      const previousMonth = dayjs(this.date).subtract(1, 'month').toDate();

      this.date = new Date(previousMonth);
    },

    setNextMonth() {
      const nextMonth = dayjs(this.date).add(1, 'month').toDate();

      this.date = new Date(nextMonth);
    },

    generateCalendarItems(count, startDate) {
      return Array.from({ length: count }, (_, index) => {
        if (index === 0) {
          return startDate.format('YYYY-MM-DD');
        }

        const currentDay = dayjs(startDate).date();
        const nextDate = dayjs(startDate).date(currentDay + index);

        return nextDate.format('YYYY-MM-DD');
      });
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
