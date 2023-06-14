<template>
  <div class="toasts">
    <VToast
      v-for="toast in toasts"
      :key="toast.id"
      :text="toast.message"
      :type="toast.options.type"
      :delay="toast.options.delay"
      @close="remove(toast)"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { TOAST_TYPES } from '../toasterService.js';

import VToast from './VToast.vue';

const DEFAULT_DELAY_IN_MS = 5000;

export default {
  name: 'TheToaster',

  components: {
    VToast,
  },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    show(message, options) {
      if (!options.type || !message) return;

      const delay = options?.delay ?? TOAST_TYPES[options.type]?.delay;

      this.toasts.push({
        id: uuidv4(),
        message,
        options: {
          ...options,
          delay: delay ?? DEFAULT_DELAY_IN_MS,
        },
      });
    },

    remove(toast) {
      const index = this.toasts.findIndex((elem) => elem === toast);
      this.toasts.splice(index, 1);
    },

    success(message, options) {
      this.show(message, {
        ...options,
        type: TOAST_TYPES.SUCCESS.type
      });
    },

    error(message, options) {
      this.show(message, {
        ...options,
        type: TOAST_TYPES.ERROR.type,
      });
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
