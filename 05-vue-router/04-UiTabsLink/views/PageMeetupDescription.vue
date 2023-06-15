<template>
  <p class="meetup-description">{{ meetup.description }}</p>
</template>

<script>
export default {
  name: 'PageMeetupDescription',

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  padding-top: 33px;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}
</style>
