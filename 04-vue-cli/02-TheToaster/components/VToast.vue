<template>
  <div
    class="toast"
    :class="stateClassName"
  >
    <UiIcon
      class="toast__icon"
      :icon="iconName"
    />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { TOAST_TYPES } from '../toasterService.js';

import UiIcon from './UiIcon.vue';

export default {
  name: 'VToast',

  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        const types = Object.values(TOAST_TYPES).map(({ type }) => type);

        return types.includes(value);
      }
    },

    text: {
      type: String,
      required: true,
    },

    delay: {
      type: Number,
      default: null,
    },
  },

  emits: [
    'close',
  ],

  components: { UiIcon },

  data() {
    return {
      timer: null,
    };
  },

  computed: {
    stateClassName() {
      return `toast_${this.type}`;
    },

    iconName() {
      const type = this.type.toUpperCase();

      return TOAST_TYPES[type].icon;
    }
  },

  mounted() {
    if (this.delay) {
      this.startTimer();
    }
  },

  beforeUnmount() {
    if (this.delay) {
      this.clearTimer();
    }
  },

  methods: {
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },

    remove() {
      this.clearTimer();
      this.$emit('close');
    },

    startTimer() {
      this.timer = setTimeout(() => {
        this.remove();
      }, this.delay);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
