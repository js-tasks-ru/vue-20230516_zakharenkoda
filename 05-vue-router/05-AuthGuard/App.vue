<template>
  <div class="wrapper">
    <div style="display: flex; flex-direction: row; justify-content: center; gap: 1rem; margin: 1rem">
      <div>Авторизованный пользователь isAuthenticated === {{ isAuthenticated }}</div>
      <button @click="login">Авторизоваться</button>
      <button @click="logout">Выйти</button>
    </div>
    <MeetupsHeader />
    <main class="main">
      <UiContainer>
        <RouterView />
      </UiContainer>
    </main>
    <MeetupsFooter />
  </div>
</template>

<script>
import MeetupsHeader from './components/MeetupsHeader.vue';
import MeetupsFooter from './components/MeetupsFooter.vue';
import UiContainer from './components/UiContainer.vue';
import { isAuthenticated, login, logout } from './services/authService.js';

export default {
  name: 'App',

  components: {
    MeetupsFooter,
    MeetupsHeader,
    UiContainer,
  },

  data() {
    return {
      isAuthenticated: isAuthenticated(),
    };
  },

  methods: {
    login() {
      login();
      this.isAuthenticated = isAuthenticated();
    },

    logout() {
      logout();
      this.isAuthenticated = isAuthenticated();
    },
  },
};
</script>

<style>
@import '@/assets/styles/_fonts.css';
@import '@/assets/styles/_variables.css';
@import '@/assets/styles/_common.css';

.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
