/**
 * Created by YYD on 4/15/16.
 */
"use strict"

var Vue = require('vue')
var sha1 = require('sha1')
var wx = require('weixin-js-sdk');    //微信官方 js-sdk CommonJS 版
var isWeChatBrowser = false;

; (function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        isWeChatBrowser = true;
    }
})();

(function () {
    var vue // lazy bind
    var asyncData = {
        created: function () {
            if (!vue) {
                console.warn('[vue-async-data] not installed!')
                return
            }
        },
        ready: function () {

        },
        methods: {
            //生成随机字符串
            getNoncestr(len) {
                len = len || 32
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var maxPos = $chars.length
                var pwd = ''
                for (var i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
                }
                return pwd
            },
            //生成时间戳
            getTimestamp() {
                return parseInt(new Date().getTime() / 1000) + ''
            },
            //获取titcket
            getTitcket(opts, cb) {
                var params = { m: 'accesstoken' };
                var self = this;
                this.$httpGet('wechat', params, function (errorCode, data) {
                    if (errorCode == 0) {
                        var jsapi_ticket = data.JSTicket;
                        // var path = sessionStorage.getItem('firsetRouterPath');
                        // var path = window.location.origin + '/';// + self.$route.path;
                        var path = window.location.href;
                        var string1 = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + opts.nonceStr + '&timestamp=' + opts.timestamp + '&url=' + path + ''
                        var sign = sha1(string1)
                        cb(null, sign)
                    } else {
                        cb(1)
                    }
                })
            },
            //通过config接口注入权限验证配置
            wechatConfig(jsApiList, cb) {
                if (!isWeChatBrowser) {
                    cb('not wechat browser');
                    return;
                }
                var self = this
                var opts = { timestamp: self.getTimestamp(), nonceStr: self.getNoncestr(16) }
                this.getTitcket(opts, function (err, data) {
                    if (!err) {
                        wx.config({
                            debug: false,
                            appId: 'wx509622015f1acca6', // 必填，公众号的唯一标识
                            timestamp: opts.timestamp, // 必填，生成签名的时间戳
                            nonceStr: opts.nonceStr, // 必填，生成签名的随机串
                            signature: data,// 必填，签名，见附录1
                            jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        })
                        wx.ready(function () {
                            cb(null);
                        });
                        wx.error(function (e) {
                            cb(e);
                        });
                    } else {
                        cb(err);
                    }
                })
            },
            //获取地理位置JS-SDK
            getLocation(callback) {
                let myLocation = sessionStorage.getItem('myLocation');
                if (myLocation) {
                    try {
                        myLocation = JSON.parse(myLocation);
                        callback(null, myLocation);
                        return;
                    } catch (e) {
                        myLocation = null;
                    }
                }
                this.wechatConfig(['getLocation'], function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                callback(null, res);
                                sessionStorage.setItem('myLocation', JSON.stringify(res));
                            },
                            error: function (err) {
                                callback(err);
                            }
                        });
                    }
                });

            },
            wxOpenLocation(params, callback) {
                wx.openLocation({
                    latitude: params.latitude, // 纬度，浮点数，范围为90 ~ -90
                    longitude: params.longitude, // 经度，浮点数，范围为180 ~ -180。
                    name: params.address, // 位置名
                    address: params.address, // 地址详情说明
                    scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            },
            wxReadyChooseImage(callback) {
                this.wechatConfig(['chooseImage', 'uploadImage'], function (err) {
                    callback(err);
                });
            },
            //选择图片
            wxChooseImage(callback) {
                var _isImgSrc = [];
                wx.chooseImage({
                    count: 9, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        _isImgSrc = _isImgSrc.concat(res.localIds)
                        callback(null, _isImgSrc)
                    },
                    error: function (err) {
                        callback(null, err);
                    }
                });
            },
            //上传图片
            wxUploadImage(_isImgSrc, callback) {
                var uploadedImages = []
                var uploadFinished = function () {
                    callback(null, uploadedImages)
                }
                var uploadNextImage = function () {
                    if (_isImgSrc.length <= 0) {
                        uploadFinished()
                        return
                    }
                    var imageURL = _isImgSrc[0]
                    _isImgSrc.splice(0, 1)
                    wx.uploadImage({
                        localId: imageURL.toString(),
                        isShowProgressTips: 0,
                        success: function (res) {
                            uploadedImages.push(res.serverId)
                            uploadNextImage()
                        },
                        fil: function (res) {
                            uploadNextImage()
                        }
                    })
                }
                uploadNextImage()
            },
            shareTimeline(data, jsApiList, callback) {
                this.wechatConfig(jsApiList, function (err) {
                    if (err) {
                        callback(err)
                    } else {
                        wx.onMenuShareTimeline({
                            title: data.title, // 分享标题
                            link: data.link, // 分享链接
                            imgUrl: data.images, // 分享图标
                            success: function () {
                                callback(null, 0)// 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                callback(null, 1)// 用户取消分享后执行的回调函数
                            }
                        })
                        wx.onMenuShareAppMessage({
                            title: data.title, // 分享标题
                            desc: data.desc, // 分享描述
                            link: data.link, // 分享链接
                            imgUrl: data.images, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                              callback(null, 0)
                            },
                            cancel: function () {
                              callback(null, 1)
                            }
                        })
                    }
                })
            }
        }
    }

    var api = {
        mixin: asyncData,
        install: function (Vue, options) {
            vue = Vue
            Vue.options = Vue.util.mergeOptions(Vue.options, asyncData)
        }
    }

    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = api
    } else if (typeof window !== 'undefined') {
        window.MyVueAsyncData = api
        Vue.use(api)
    }
})()
