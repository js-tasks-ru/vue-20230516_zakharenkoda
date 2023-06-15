import '@/assets/styles/_button.css';
import '@/assets/styles/_checkbox.css';
import '@/assets/styles/_form.css';
import '@/assets/styles/_form-group.css';
import '@/assets/styles/_input-group.css';
import '@/assets/styles/_page-auth.css';
import '@/assets/styles/_title.css';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

createApp(App).use(router).mount('#app');
