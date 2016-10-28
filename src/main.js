import Vue from 'vue'
import VueRouter from 'vue-router'
import wxService from './wxService'
import Service from './service'
import MKOUtils from './MKOUtils'
import App from './App.vue'
Vue.use(VueRouter)
Vue.use(Service)
Vue.use(wxService)
Vue.use(MKOUtils)

var router = new VueRouter({
  history: true
})
var firstTime = true;
var isWeChatBrowser = false;
; (function () {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    isWeChatBrowser = true;
  }
})();

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
  '/result': {
    component: require('./views/result.vue'),
    name: 'result'
  },
  '/contact': {
    component: require('./views/contact.vue'),
    name: 'contact'
  },
  '/wechat': {
    component: require('./views/wechat.vue'),
    name: 'wechat'
  },
  '/getOpenID': {
    component: require('./views/getOpenID.vue'),
    title: '授权页面'
  }
});

router.beforeEach(function (transition) {
  if (!isWeChatBrowser) {
    transition.next();
    return;
  }

  if (firstTime) {
    sessionStorage.setItem('firsetRouterPath', window.location.href);
  }
  firstTime = false;
  if (!localStorage.getItem('openID')) {
    if (!sessionStorage.getItem('path')) {
      sessionStorage.setItem('path', transition.to.path);
      transition.redirect('/getOpenID');   //重定向调整页面进行微信授权
    } else {
      transition.next();
    }
  } else {
    if (transition.to.title === "授权页面") {
      if (sessionStorage.getItem('path')) {
        transition.redirect(sessionStorage.getItem('path'));
      } else {
        transition.redirect('/');
      }
    } else {
      transition.next();
      sessionStorage.removeItem('path');
    }
  }
});

router.start(App, '#app');
