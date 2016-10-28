/**
 * Created by Kevin Lu on 6/24/16.
 */
"use strict"

var Vue = require('vue');
var sha1 = require('sha1');

; (function () {
    var mkoUtils = {
        created: function () {
            if (!Vue) {
                console.warn('MKOUtils not installed!')
                return
            }
        },
        compiled: function () {

        },
        methods: {
            /* MKOCache{
                hash: "xdedsincsdzdds",
                data: {}
            }
            */
            MKOCacheByKey(key) {
                if (!key)
                    return null;
                let value = window.localStorage.getItem(key);
                if (value) {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        value = null;
                    }
                    return value;
                }
            },
            MKOCacheUpdateCacheByKey(key, value) {
                if (!key || !value)
                    return;
                let valueString = null;
                try {
                    valueString = JSON.stringify(value);
                } catch (e) {
                    valueString = null;
                }
                if (!valueString)
                    return;
                let sign = sha1(valueString);
                value = JSON.stringify({ hash: sign, data: value });
                window.localStorage.setItem(key, value);
            },
            MKOCacheIsSame(sourceKey, value) {
                if (!sourceKey || !value)
                    return false;
                let sourceValue = this.MKOCacheByKey(sourceKey);
                if (sourceValue) {
                    try {
                        value = JSON.stringify(value);
                    } catch (e) {
                        value = null;
                    }
                    if (!value)
                        false;
                    var sign = sha1(value);
                    return sign == sourceValue.hash;
                }
                return false;
            }
        }
    };

    var api = {
        mixin: mkoUtils,
        install: function (Vue, options) {
            Vue.options = Vue.util.mergeOptions(Vue.options, mkoUtils)
        }
    }

    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = api
    } else if (typeof window !== 'undefined') {
        window.MKOUtils = api
        Vue.use(api)
    }
})()
