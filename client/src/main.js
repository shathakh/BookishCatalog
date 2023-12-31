// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import Vuelidate from "vuelidate";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.use(VueCookies);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
