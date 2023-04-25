import { createApp } from 'vue';
import App from './App.vue';

import router from './router/router.js';
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";
import "tailwindcss/tailwind.css"
import '@fortawesome/fontawesome-free/js/all'

import "./index.css";
const pinia = createPinia();
pinia.use(piniaPersist)

const app = createApp(App);
app.use(router).use(pinia).use(VueAwesomePaginate).mount("#app");
