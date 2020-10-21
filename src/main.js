import Vue from "vue";
import Vulidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import dateFilter from "@/filters/date.filter";
import "./registerServiceWorker";
import VueSocketIO from 'vue-socket.io'
const host = document.location.host.split(':')[0]

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://'+host+':3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "/io" } //Optional options
}))

Vue.filter("date", dateFilter);
Vue.config.productionTip = false;
Vue.use(Vulidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
