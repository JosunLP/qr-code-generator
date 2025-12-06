import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./plugins/i18n";
import "./registerServiceWorker";
import store from "./store";
import "./styles/tailwind.css";

createApp(App).use(i18n).use(store).mount("#app");
