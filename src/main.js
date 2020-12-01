import Vue from 'vue'
import Vuelidate from "vuelidate"
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "@/filters/date.filter"
import currencyFilter from "@/filters/currency.filter"
import tooltipDirective from "@/directives/tooltip.directive"
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.use(messagePlugin);
Vue.component("Loader", Loader);

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBdrUHC9ZtB639vMYrDpv7TbKm_bfGMB5o",
  authDomain: "test-b8071.firebaseapp.com",
  databaseURL: "https://test-b8071.firebaseio.com",
  projectId: "test-b8071",
  storageBucket: "test-b8071.appspot.com",
  messagingSenderId: "580906651559",
  appId: "1:580906651559:web:ffd29c6a44c9e4be32f082"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')    
  }
});