/**
 * Created by YYD on 4/15/16.
 */
"use strict"
var Vue = require('vue')
var  VueResource = require('vue-resource')
Vue.use(VueResource)

;(function () {
    var vue// lazy bind
    var baseURL = 'http://www.gugusuo.com/wx/';
    // var baseURL = 'http://10.0.1.10:8081/';
    var asyncData = {
        created: function (){
            if (!vue) {
                console.warn('[vue-async-data] not installed!')
                return
            }
        },
        compiled: function () {

        },
        methods: {
            $httpGet: function (service, params, cb){
                // GET request
                var queryArray = new Array()
                for(var key in params)
                    queryArray.push(key + "=" + params[key])
                var queryString = queryArray.join("&")
                var queryURL = baseURL + service + '?' + queryString
                this.$http({
                    url: queryURL,
                    method: 'GET'
                }).then(function (result) {
                    var data = result.data;
                    if(data.code == 0){
                        cb(0, data);
                    }else{
                        cb(1, data);
                    }
                }, function (error) {
                    cb(-1, {});// error callback
                });
            },
            $httpPost: function (service, params, cb){
                // POST request
                var queryURL = baseURL + service;

                this.$http.post(queryURL, params).then((response) => {
                    // success callback
                    var data = response.data;
                    if (data.code == 0) {
                        cb(0, data);
                    } else {
                        cb(data.code, {});
                    }
                }, (error) => {
                    cb(-1, error);// error callback
                });

                // this.$http.post(queryURL, params).then(function(response){
                //     cb(0, response);
                // }).error(err){
                //     cb(1, err);
                // };
                // this.$http({
                //     url: queryURL,
                //     data: params,
                //     method: 'POST'
                // }).then(function (result) {
                //     var data = result.data;
                //     if(data.code == 0){
                //         cb(0, data);
                //     }else{
                //         cb(1, data);
                //     }
                // }, function (error) {
                //     cb(-1, {});// error callback
                // });
            }
        }
    };

    var api = {
        mixin: asyncData,
        install: function (Vue, options) {
            vue = Vue
            Vue.options = Vue.util.mergeOptions(Vue.options, asyncData)
        }
    }

    if(typeof exports === 'object' && typeof module === 'object') {
        module.exports = api
    } else if (typeof window !== 'undefined') {
        window.MyVueAsyncData = api
        Vue.use(api)
    }
})()
