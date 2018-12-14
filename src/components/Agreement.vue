<template>
    <article class="page page-agreement" v-show="$store.state.openAgree">
        <div class="wrapper1" ref="wrapper">
            <div class="content">
                <article class="argee-article">
                    <h1>天津欧拉融资租赁有限公司<br>微信金融服务账号绑定协议</h1>
                    <section>
                        <strong>一、协议的范围</strong>
                        <p>本协议是用户与天津欧拉融资租赁有限公司（以下简称“欧拉融资租赁”）之间关于用户微信账号与欧拉融资租赁微信服务号绑定所订立的协议。</p>
                        <strong>二、无保证及免责声明</strong>
                        <p>用户明确同意本平台服务的使用由用户个人承担风险。长城汽车金融明确表示不提供任何类型的担保，不论是明确的或隐含的。包括并不限于： </p>
                        <ul>
                            <li>（1）不担保服务一定能满足用户的要求；</li>
                            <li>（2）不担保服务不会受中断，对服务的及时性、安全性、出错发生都不作担保；</li>
                            <li>（3）不担保信息能否准确、及时、顺利地传送；</li>
                        </ul>
                        <p>欧拉融资租赁对直接、间接、偶然、特殊及继起的损害不负责任，具体条款如下所示：</p>
                        <ul>
                            <li>（1）若欧拉融资租赁已经明示其网络服务提供方式发生变更并提醒用户应当注意事项，用户未按要求操作所产生的一切后果由用户自行承担。</li>
                            <li>（2）用户明确同意其使用欧拉融资租赁网络服务所存在的风险将完全由其自己承担；因其使用欧拉融资租赁服务而产生的一切后果也由其自己承担，欧拉融资租赁对用户不承担任何责任。</li>
                            <li>（3）欧拉融资租赁不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</li>
                            <li>
                                （4）用户同意保障和维护欧拉融资租赁及其他用户的利益，由于用户登录网站内容违法、不真实、不正当、侵犯第三方合法权益，或用户违反本协议项下的任何条款而给欧拉融资租赁或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。
                            </li>
                            <li>（5）本服务通过微信公共平台进行数据传输，欧拉融资租赁不能控制微信公共平台，对于数据不会被擅自存取或被意外或故意地操纵不能保证，若出现此情形，长城汽车金融对用户不承担任何责任。
                            </li>
                        </ul>
                        <strong>三、业务流程</strong>
                        <p>
                            用户同意使用欧拉融资租赁微信服务，并自愿将本人微信号与欧拉融资租赁服务号进行绑定。绑定后，申请人可通过微信向欧拉融资租赁查询相关贷款信息，因微信运营商原因导致无法正常提供微信服务的，不视为欧拉融资租赁违约。当申请人不在关注欧拉融资租赁微信服务号时，自动解除绑定。</p>
                        <strong>四、声明与承诺</strong>
                        <p>申请人确认：已认真阅读本协议，对本协议条款的含义及相应的法律后果已经全部知晓并充分理解，同意自行承担相关风险。</p>
                        <strong>五、法律适用及管辖</strong>
                        <ul>
                            <li>（1）本协议之订立、生效、解释、履行均适用于中国人民共和国法律（不包括香港特别行政区、澳门特别行政区法律）。</li>
                            <li>（2）用户同意因本条款和条件而产生的任何争议或纠纷均适用中华人民共和国法律，并由天津欧拉融资租赁有限公司所在地法院管辖。</li>
                        </ul>
                    </section>
                </article>
            </div>
        </div>
        <footer>
            <a
                    href="javascript:;"
                    class="btn btn-submit"
                    @click="closeModal"
            >确定</a>
        </footer>
    </article>
</template>
<script>
    import BScroll from 'better-scroll'
    import store from './../store'
    export default {
        name: 'agreement',
        updated(){
            if(!this.$store.state.openAgree) return;
            this.$nextTick(() => {
                new BScroll(this.$refs.wrapper, {})
            })
        },
        methods:{
            closeModal(){
                store.commit('updatedOpenAgree', false);
            }
        }
    }
</script>
<style scoped lang="less">
    .wrapper1 {
        width: 100vw;
        flex: 1;
        /*height: 500px;*/
        overflow: hidden;
        background: #ffffff;
    }

    .argee-article {
        padding: .3rem;
        h1 {
            text-align: center;
            font-size: .36rem;
            padding: 0;
            margin: 15px 0;
            margin-top: 20px;
        }
        section{
            font-size: .3rem;
            line-height: .5rem;
        }
        strong{
            display: block;
            padding-top:15px;
            padding-bottom: 2px;
        }
        p{text-indent: 2em}
    }

    .page-agreement {
        position: absolute;
        left: 0;
        top: 0;
        background: #F8F8F8;
        width: 100%;
        height: 100vh;
        z-index: 8;
        footer{
            padding: .2rem .4rem;
        }
    }
</style>