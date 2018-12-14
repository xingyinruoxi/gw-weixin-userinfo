<template>
    <section class="page page-login">
        <Agreement/>
        <div class="list-block">
            <ul>
                <li>
                    <div class="item-content">
                        <div class="item-title label">证件类型</div>
                        <div class="item-input">
                            <input type="text" value="居民身份证" disabled>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-title label">证件号码</div>
                        <div class="item-input">
                            <input
                                    type="text"
                                    placeholder="请输入证件号码"
                                    v-model="userInfo.idCard"
                                    @blur="checkCard(userInfo.idCard)"
                            >
                        </div>
                        <div class="item-after" v-show="errers.cardErrer">
                            <FormErrer/>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-title label">手机号</div>
                        <div class="item-input">
                            <input
                                    type="text"
                                    placeholder="请输入手机号"
                                    v-model="userInfo.phone"
                                    @blur="checkphone(userInfo.phone)"
                            >
                        </div>
                        <div class="item-after" v-show="errers.phoneErrer">
                            <FormErrer/>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-title label">验证码</div>
                        <div class="item-input">
                            <input
                                    type="number"
                                    placeholder="请输入验证码"
                                    v-model="userInfo.code"
                                    @blur="checkCode(userInfo.code)"
                            >
                        </div>
                        <div class="item-after" v-show="errers.codeErrer">
                            <FormErrer/>&nbsp;&nbsp;
                        </div>
                        <div class="item-after item-after-code">
                            <button
                                    class="link-code"
                                    @click="sendCode"
                            >
                                获取验证码
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="list-block-label" style="display: block">温馨提示：每天获取验证码不能超过3次</div>
        </div>
        <footer>
            <div class="check-box">
                <label>
                    <input
                            type="checkbox"
                            v-model="checked"
                    />
                    <span>&nbsp;</span>
                    我已阅读并同意
                </label>
                <a
                        href="javascript:;"
                        @click="openAgreement"
                >《欧拉融资租赁账号绑定协议》</a>
            </div>
            <button
                    class="btn btn-submit"
                    :disabled="!onOff"
                    @click="clickSubmit"
            >确定
            </button>
        </footer>
    </section>
</template>
<script>
    import FormErrer from './../components/FormErrer'
    import Agreement from './../components/Agreement'
    import {getMobileCode, doLogin, getOpenId} from './../server'
    import {isLogin} from './../lib/utils'

    export default {
        name: 'login',
        components: {
            FormErrer,
            Agreement
        },
        data() {
            return {
                checked: false,
                userInfo: {
                    idCard: '',
                    phone: '',
                    code: '',
                    openId: this.$store.state.openId,
                },
                errers: {
                    cardErrer: false,
                    phoneErrer: false,
                    codeErrer: false,
                },
                onOff: false,
            }
        },
        watch: {
            userInfo: {
                handler(newName, oldName) {
                    this.checkSubmit();
                    // console.log('newName',newName);
                },
                deep: true
            },
            /* errers:{
                 handler(newName, oldName) {
                     this.checkSubmit()
                 },
                 deep: true
             }*/
        },
        async beforeCreate() {
            if (isLogin()) {
                this.$router.push({path: '/contractdetail'});
            } else {
                let {code} = this.$route.query;
                let {token, status, openId} = await getOpenId({grantCode: code});
                if (status !== 'success') return;
                localStorage.setItem("openId", openId);
                if (!token) return;
                localStorage.setItem("token", token);
                this.$router.push({path: '/contractdetail'});
            }
        },
        methods: {
            openAgreement() {
                this.$store.commit('updatedOpenAgree', true)
            },
            checkphone(phone) {
                let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (!reg.test(phone)) {
                    this.errers.phoneErrer = true;
                    return false;
                } else {
                    this.errers.phoneErrer = false;
                    return true;
                }
            },
            checkCard(idCard) {
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (reg.test(idCard) === false) {
                    this.errers.cardErrer = true;
                    return false;
                } else {
                    this.errers.cardErrer = false;
                    return true;
                }

            },
            checkCode(code) {
                let reg = /^\d{4}$/;
                if (reg.test(code) === false) {
                    this.errers.codeErrer = true;
                    return false;
                } else {
                    this.errers.codeErrer = false;
                    return true;
                }
            },
            checkSubmit() {
                let userInfoResult = Object.values(this.userInfo).every(item => {
                    return item !== '';
                });
                let errerResult = Object.values(this.errers).every(item => {
                    return item !== true;
                });
                // this.onOff = errerResult&&userInfoResult;
                this.onOff = userInfoResult;
            },
            async sendCode({target}) {
                let {phone} = this.userInfo;
                let hasPhone = this.checkphone(phone);
                if (!hasPhone) return;
                let data = await getMobileCode({phone})
                if (data.status !== 'success') return;
                var num = 90;
                var timer = setInterval(function () {
                    num--;
                    target.innerHTML = num + '秒后重新获取';
                    target.style.color = '#808080';
                    target.disabled = ' disabled';
                    if (num === 0) {
                        target.style.color = '#1AAD1A';
                        target.disabled = '';
                        target.innerHTML = '获取验证码';
                        clearInterval(timer)
                    }
                }, 1000)
            },
            async clickSubmit() {
                if (this.checked) {
                    let {token, status} = await doLogin(this.userInfo);
                    if (status !== 'success') return;
                    localStorage.setItem("token", token);
                    this.$router.push({path: '/contractdetail'})
                } else {
                    this.$store.commit('alertModal', '请仔细阅读《微信金融服务账号绑定协议》，同意后可进行账号绑定操作')
                }

            }
        }
    }
</script>
<style scoped lang="less">
    .page-login {
        min-height: 500px;
    }

    .check-box {
        font-size: .26rem;
        padding-bottom: 15px;
        label {
            color: #808080
        }
        a {
            color: #586C94
        }
        input {
            display: none;
        }
        span {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 4px;
            position: relative;
            top: -2px;
        }
        input ~ span {
            background: url("./../assets/img/ico-radio.png") no-repeat center;
            background-size: 100%;
        }
        input:checked ~ span {
            background: url("./../assets/img/ico-radio-active.png") no-repeat center;
            background-size: 100%;
        }
    }

    .list-block .item-title.label {
        color: #000;
        width: 30%;
        font-size: .3rem;
    }

    .item-after-code {
        border-left: 1px solid #E5E5E5;
        padding-left: .3rem;
        padding-right: .2rem;
    }

    .item-after-code .link-code {
        color: #1AAD1A;
        font-size: .3rem;
    }

    .list-block {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    footer {
        padding: .2rem .4rem;
    }

    .btn-submit:disabled {
        background: #BAE6BA;
    }
</style>