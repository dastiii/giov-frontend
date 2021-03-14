import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./app.css";
import axios from "axios";
import "./icons";
import VueScreen from "vue-screen";
import VTooltip from "v-tooltip";

Vue.use(VTooltip);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
Vue.prototype.$formatWeight = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

Vue.use(VueScreen);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
