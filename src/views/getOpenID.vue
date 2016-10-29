<!-- component -->
<template>
   <div class="shouquan-main">正在授权..</div>
</template>

<!-- js -->
<script>
module.exports = {
    data(){
        return {}
    },
    ready(){
        this.getWechatCode();
    },
    methods: {
        //第一步：用户同意授权，获取code
        getWechatCode(){
            var queryCode = this.$route.query;
            if(queryCode.code === undefined){
                var redirect_uri = encodeURIComponent(window.location.href);
                var params = {
                    appid: 'wx509622015f1acca6',
                    redirect_uri: redirect_uri,
                    response_type: 'code',
                    scope: 'snsapi_userinfo',
                    state: 'STATE'
                };
                var paramsArray = [];
                for(var key in params)
                    paramsArray.push(key + "=" + params[key]);
                var paramsString = paramsArray.join("&");
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + paramsString + '#wechat_redirect';
            }else{
                //获取code
                this.getOpenID(this.$route.query.code);
            }
        },
        //第二步：通过code换取网页授权access_token
        getOpenID(code){
            var self = this;
            //获取openid
            if(code === undefined){
                alert('code is not undefined');
                return;
            }
            var params = {
                m: 'openid',
                code: code
            };
            this.$httpGet('wechat', params, function (code, data) {
                if (code == 0) {
                    localStorage.setItem('openID', data.response.openid);
                    self.$router.go('topic');
                }else {
                    alert('获取用户信息失败');
                }
            });
        }
    }
};
</script>
