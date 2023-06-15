<template>
  <header class="header">
    <MeetupsLogo />
    <MeetupsNav />
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import MeetupsLogo from './MeetupsLogo.vue';
import MeetupsNav from './MeetupsNav.vue';

export default defineComponent({
  name: 'MeetupsHeader',
  components: { MeetupsNav, MeetupsLogo },
});
</script>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}
</style>
