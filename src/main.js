import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
Vue.use(VueRouter)

var router = new VueRouter({
  history: true
})

router.map({
  '/': {
    component: require('./views/home.vue'),
    name: 'home'
  },
  '/no': {
    component: require('./views/no.vue'),
    name: 'no'
  },
  '/topic': {
    component: require('./views/topic.vue'),
    name: 'topic'
  },
  '/contact': {
    component: require('./views/contact.vue'),
    name: 'contact'
  },
  '/wechat': {
    component: require('./views/wechat.vue'),
    name: 'wechat'
  }
});

// router.beforeEach(function (transition) {
//   if (transition.to.name === 'topic') {
   
//     transition.next();
//   }
// });

router.start(App, '#app');
