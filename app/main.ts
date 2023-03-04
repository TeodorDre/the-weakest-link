import '@/assets/styles/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import patchVueApp from '@/code/global/patch-vue-app';

const app = createApp(App);

patchVueApp(app);

app.mount('#app');
