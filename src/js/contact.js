"use strict"



module.exports = {
    data() {
        return {
            username: '',
            contact: '',
            company: ''
        }
    },
    ready() {

    },
    methods: {
      submitInfo(){
        var self = this;
        var data = {
          openid: localStorage.getItem('uuid'),
          name: this.username,
          contact: this.contact,
          company: this.company,
          value: this.$route.query.value
        }
        this.$httpPost('game', {action: 'new', data: data}, function(err, result){
          self.$router.go('/wechat');
        });
      }
    }
};
