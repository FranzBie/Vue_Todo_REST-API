// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css'

const app = createApp(App);

app.use(router).mount('#app');
