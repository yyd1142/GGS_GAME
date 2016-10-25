// header顶部导航
require("./style.less");
// var tabs = [{name: '活动首页', active: 'header-active', url: '/', path: 'home'},
//     {name: '微课堂', active: '', url: '/wechat_course' ,path: 'wechatCourse'},
//     {name: '视频讲座', active: '', url: '/video', path: 'video'},
//     {name: '线下活动', active: '', url: '/offline', path: 'offline'}];
module.exports = {
    template: require('./template.html'),
    data() {
        return {
            userName: '',
            popupShow: false
        }
    },
    ready() {
        if (!localStorage.getItem("userInfo")){
            this.userName = '请登录';
        } else {
            this.userName = JSON.parse(localStorage.getItem("userInfo")).response.user.email;
        }
    },
    methods: {
        logout(){
            localStorage.clear();
            sessionStorage.clear();
            this.$router.go('/login#top');
        }
    }
}