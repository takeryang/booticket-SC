import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '../node_modules/axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import currencyFilter from "./components/filters/currency";
import VueTheMask from 'vue-the-mask';
import firebase from 'firebase/app';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "firebase/analytics";
import 'firebase/auth';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';
import "./bus";
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';


const firebaseConfig = {
  apiKey: "AIzaSyCYK2d7afvOKYwYdrX8eh9OnVZywQFcWv0",
  authDomain: "tonal-nucleus-303104.firebaseapp.com",
  projectId: "tonal-nucleus-303104",
  storageBucket: "tonal-nucleus-303104.appspot.com",
  messagingSenderId: "815043559416",
  appId: "1:815043559416:web:6c5b82f122739acd4d600d",
  measurementId: "G-PTG7JL17Z9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueTheMask);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);


axios.defaults.withCredentials = true;
let remember = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

AOS.init();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

//Vee-Validate

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);

});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});


//檢查用戶是否仍持續登入
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path:'/admin_login'
        })
      }
    });
  } else {
    next();
  }
})
//檢查用戶是否仍持續登入

router.beforeEach((to, from, next) => {
  if(to.meta.customerLogin) {
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({
        path:'/customer_login'
      })
    }
  }else{
    next();
  }
})