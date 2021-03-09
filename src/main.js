import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import GAuth from "@/config/oAuth.js";

const gAuthOptions = {
  apiKey: process.env.VUE_APP_API_KEY,
  clientId: process.env.VUE_APP_CLIENT_ID
};

Vue.use(GAuth, gAuthOptions);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
