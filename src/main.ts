import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import { i18n } from "./plugins/i18n";

createApp(App).use(i18n).use(store).mount("#app");
