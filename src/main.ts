import App from "@/App.vue";
import router from "@/router";
import "bootstrap/dist/css/bootstrap.css";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
