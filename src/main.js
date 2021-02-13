import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import GAuth from '@/config/oAuth.js';

const gAuthOptions = {
//   clientId: '588489958660-935bh5p6hqo7psgvld5k9knigsfdsila.apps.googleusercontent.com',
//   scope: 'https://www.googleapis.com/auth/contacts.other.readonly',
//   prompt: 'select_account',
//   discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
//   apiKey: 'AIzaSyBZ0Wjzrb36A7G86NpcnqNVio0g8q0DtDM'
// };

Vue.use(GAuth, gAuthOptions)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
