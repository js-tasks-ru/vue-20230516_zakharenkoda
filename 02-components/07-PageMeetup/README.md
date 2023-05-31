# PageMeetup

Компонент может быть в 4-х состояниях:

1. Загрузка ещё не началась (необязательное состояние)
2. Загрузка
3. Данные получены успешно
4. Ошибка при получении данных

Как минимум требуется в данных компонента хранить как полученные данные, так и ошибку получения данных. Дополнительно
можно определять состояние приложения либо из комбинации "данные + ошибка", либо добавляя флаг загрузки, либо храня
состояние в отдельном свойстве. Последний вариант - самое удобное и чистое решение, которое позволяет явно задавать
текущее состояние. Для состояний можно завести константы.

Требуется также добавить метод получения данных с API, вызывать его в хуке жизненного цикла `mounted` или `created`.
Полученные данные нужно хранить в данных (состоянии) компонента. Этот метод также требуется вызывать при изменении
параметра `meetupId`. Хук `created` можно заменить на `immediate: true` у отслеживания.

Важно начальным значением данных митапа иметь `null`, и не выводить `<MeetupView>`, пока нет данных митапа.

```javascript
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
```
