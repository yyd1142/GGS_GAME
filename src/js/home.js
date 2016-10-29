"use strict"



module.exports = {
    data() {
        return {
            alert: false
        }
    },
    ready() {
      var uuid = function(len, characters) {
          let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
          let uuid = [], i;
          let radix = chars.length;
          if (len) {
              for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
          } else {
              let r;
              characters = characters || '-';
              uuid[8] = uuid[13] = uuid[18] = uuid[23] = characters;
              uuid[14] = '4';
              for (i = 0; i < 36; i++) {
                  if (!uuid[i]) {
                      r = 0 | Math.random() * 16;
                      uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                  }
              }
          }
          return uuid.join('');
      }

      let self = this;
      let uidString = localStorage.getItem('uuid');
      if (!uidString || uidString.length != 32){
          uidString = uuid(32);
          localStorage.setItem('uuid', uidString);
      }else {
        this.$httpPost('game', {action: 'query', data: {openid: uidString}}, function(err, result){
          if (result && result.code == 0 && result.response.data && 'openid' in result.response.data){
            let url = `/result?uuid=${uidString}`;
            window.location.href = url;
          }
        });
      }
    },
    methods: {
      startTest(){
        this.$router.go('/topic');
        // var self = this;
        // var isWeChatBrowser = false;
        // var ua = navigator.userAgent.toLowerCase();
        // if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //     isWeChatBrowser = true;
        // }
        //
        // if (isWeChatBrowser) {
        //     if (!localStorage.getItem('openID')) {
        //       self.$router.go('/getOpenID');
        //     }
        // }else {
        //   self.$router.go('/topic');
        // }
      }
    }
};
