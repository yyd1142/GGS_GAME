"use strict"
var A_URL = '/assets/images/A_ic@3x.png';
var B_URL = '/assets/images/B_ic@3x.png';
var C_URL = '/assets/images/C_ic@3x.png';
var D_URL = '/assets/images/D_ic@3x.png';
var okURL = '/assets/images/ok_ic@3x.png';

var topics = [
    {
        STEP: false,
        title: '2.我们团队的组建情况？',
        A_URL: A_URL, B_URL: B_URL, C_URL: C_URL,
        A_VALUE: 10, B_VALUE: 15, C_VALUE: 20,
        A_NAME: '刚刚成立，人数不到3人', B_NAME: '基本人员已经到位，公司已运营超过半年', C_NAME: '组织架构完整，团队进入扩张阶段,'
    },
    {
        STEP: false,
        title: '3.我们公司所处哪个行业？',
        A_URL: A_URL, B_URL: B_URL, C_URL: C_URL, D_URL: D_URL,
        A_VALUE: 20, B_VALUE: 15, C_VALUE: 15, D_VALUE: 10,
        A_NAME: '新兴行业，如TMT、医疗健康、智能制造', B_NAME: '传统制造企业', C_NAME: '贸易类企业', D_NAME: '其他'
    },
    {
        STEP: false,
        title: '4.我们公司的财务制度是否稳定？',
        A_URL: A_URL, B_URL: B_URL, C_URL: C_URL,
        A_VALUE: 20, B_VALUE: 15, C_VALUE: 10,
        A_NAME: '财务专人专岗，财务制度规范化', B_NAME: '财务制度正在完善中', C_NAME: '尚未建立规范的财务制度'
    },
    {
        STEP: false,
        title: '5.我们目前所处于的市场地位？',
        A_URL: A_URL, B_URL: B_URL, C_URL: C_URL, D_URL: D_URL,
        A_VALUE: 20, B_VALUE: 15, C_VALUE: 10, D_VALUE: 5,
        A_NAME: '只有我们公司，处于垄断地位', B_NAME: '除了我们，有几家大型的同类公司', C_NAME: '多家竞争力差不多的公司，其中包括我们', D_NAME: '市场充分竞争，我们刚刚进入'
    },
    {
        STEP: false,
        title: '6.我们的盈利能力如何？',
        A_URL: A_URL, B_URL: B_URL, C_URL: C_URL, D_URL: D_URL,
        A_VALUE: 20, B_VALUE: 15, C_VALUE: 10, D_VALUE: 5,
        A_NAME: '已经实现盈利，公司经营有盈余', B_NAME: '基本满足盈亏平衡', C_NAME: '目前处于亏损状态，预计半年内能产生利润', D_NAME: '目前处于亏损状态，预计超过半年才能产生利润'
    },
    {
        STEP: false,
        title: '7.我们公司发展速度如何？增长率如何？',
        A_URL: A_URL, B_URL: B_URL, C_URL: C_URL,
        A_VALUE: 20, B_VALUE: 15, C_VALUE: 10,
        A_NAME: '快速发展阶段，净利润或数据量增速大于10%', B_NAME: '一般发展阶段，净利润或数据量增速小于10%', C_NAME: '处于停滞阶段，正在调整发展策略'
    },
    {
        STEP: false,
        title: '8.我们属于哪一类独特性企业？',
        A_URL: A_URL, B_URL: B_URL, C_URL: C_URL,
        A_VALUE: 20, B_VALUE: 15, C_VALUE: 10,
        A_NAME: '我们的技术短期内无法复制', B_NAME: '我们具有一定资源垄断性质', C_NAME: '我们采用的商业模式创新'
    }]
module.exports = {
    data() {
        return {
            yesURL: '/assets/images/yes_ic@2x.png',
            noURL: '/assets/images/no_ic@2x.png',
            topics: topics,
            STEP1: true,
            messageView: false,
            resultView: false
        }
    },
    ready() {
        document.getElementById("register").addEventListener("blur", validateRegister, false);
        document.getElementById("actual").addEventListener("blur", validateActual, false);
        document.getElementById("profit").addEventListener("blur", validateProfit, false);
        document.getElementById("calBut").addEventListener("click", cal, false);
    },
    methods: {
        checkedYES(i) {
            if (i == 0) {
                this.yesURL = okURL;
                this.noURL = '/assets/images/no_ic@2x.png';
            } else {
                this.yesURL = '/assets/images/yes_ic@2x.png';
                this.noURL = okURL;
            }
            let self = this;
            this.$nextTick(function () {
                setTimeout(function () {
                    self.STEP1 = false;
                    self.topics[0].STEP = true;
                }, 300);
            })
        },
        radioChecked(index, i) {
            let self = this;
            if (i == 0) {
                this.topics[index].A_URL = okURL;
                this.topics[index].B_URL = B_URL;
                this.topics[index].C_URL = C_URL;
                this.topics[index].D_URL = D_URL;
            } else if (i == 1) {
                this.topics[index].A_URL = A_URL;
                this.topics[index].B_URL = okURL;
                this.topics[index].C_URL = C_URL;
                this.topics[index].D_URL = D_URL;
            } else if (i == 2) {
                this.topics[index].A_URL = A_URL;
                this.topics[index].B_URL = B_URL;
                this.topics[index].C_URL = okURL;
                this.topics[index].D_URL = D_URL;
            } else if (i == 3) {
                this.topics[index].A_URL = A_URL;
                this.topics[index].B_URL = B_URL;
                this.topics[index].C_URL = C_URL;
                this.topics[index].D_URL = okURL;
            }
            this.$nextTick(function () {
                setTimeout(function () {
                    self.topics[index].STEP = false;
                    if (index == 6) {
                        self.messageView = true;
                    } else {
                        self.topics[index + 1].STEP = true;
                    }
                }, 300);
            })
        },
        submit() {
            yan();
            let self = this;
            this.$nextTick(function () {
                setTimeout(function () {
                    self.messageView = false;
                    self.$router.go('/result');
                }, 300);
            })
        }
    }
};
