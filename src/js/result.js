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
        this.$nextTick(function () {
            self.firstResult = sessionStorage.getItem('firstResult');
        });
        // this.share();
    },
    methods: {
        share() {
            var shareParams = {
                title: '你的企业估值是多少',
                link: window.location.href,
                images: '/assets/images/ewm_pic@3x.png',
                desc: '“如果要投资一家公司的管理者能够做到聪明、勤奋、正直，只要企业估值合理，必定是一个很好的标的。”'
            };
            this.shareTimeline(shareParams, ['onMenuShareTimeline', 'onMenuShareAppMessage'], function (err, data) {
                if (err) {
                    return;
                }
            });
        }
    }
};
