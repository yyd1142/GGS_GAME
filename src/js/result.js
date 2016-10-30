"use strict"

module.exports = {
    data() {
        return {
            alert: false,
            firstResult: '',
            friendResult: '',
            friendResultShow: false
        }
    },
    ready() {
        let self = this;
        let uidString = localStorage.getItem('uuid');
        if (uidString != this.$route.query.uuid){
          sessionStorage.setItem('firendUUID', this.$route.query.uuid);
          this.$nextTick(function(){
            self.$router.go('/');
          });
          return;
        }

        setTimeout(function(){
          self.share();
        }, 700);

        let firendUUID = sessionStorage.getItem('firendUUID');
        if (firendUUID && firendUUID.length > 0){
          this.$httpPost('game', {action: 'query', data: {openid: firendUUID}}, function(err, result){
            if (result && result.code == 0 && result.response.data && 'openid' in result.response.data){
              self.friendResult = result.response.data.value;
              self.friendResultShow = true;
            }
          });
        }

        let value = this.$route.query.value;
        if (value && value.length > 0){
          this.$nextTick(function(){
            this.firstResult = value;
          });
        }else {
          this.$httpPost('game', {action: 'query', data: {openid: uidString}}, function(err, result){
            if (result && result.code == 0 && result.response.data && 'openid' in result.response.data){
              self.firstResult = result.response.data.value;
            }else {
              this.$nextTick(function(){
                self.$router.go('/');
              });
            }
          });
        }
    },
    methods: {
        share() {
            var shareParams = {
                title: '测测你的企业估值多少？',
                link: window.location.href,
                images: 'http://game.gugusuo.com/ggslogo.jpeg',
                desc: '我的企业原来估值是这个数，你也来测测？'
            };
            var self = this;
            this.shareTimeline(shareParams, ['onMenuShareTimeline', 'onMenuShareAppMessage'], function (err, data) {
                if (!err && data == 0) {
                  self.$router.go('/wechat');
                  // let url = `/contact?value=${self.firstResult}`;
                  // self.$router.go(url);
                }
            });
        },
        goContact(){
          this.$router.go('/wechat');
        }
    }
};
