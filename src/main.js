import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import GAuth from '@/config/oAuth.js';

const gAuthOptions = {

//   scope: 'https://www.googleapis.com/auth/contacts.other.readonly',
//   prompt: 'select_account',
//   discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
 
// };

Vue.use(GAuth, gAuthOptions)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
