"use strict"



module.exports = {
    data() {
        return {
            alert: false
        }
    },
    ready() {
    },
    methods: {
      startTest(){
        var self = this;
        var isWeChatBrowser = false;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            isWeChatBrowser = true;
        }

        if (isWeChatBrowser) {
            if (!localStorage.getItem('openID')) {
                if (!sessionStorage.getItem('path')) {
                    sessionStorage.setItem('path', transition.to.path);
                    self.$router.go('/getOpenID');
                }
            }
        }else {
          self.$router.go('/topic');
        }
      }
    }
};
