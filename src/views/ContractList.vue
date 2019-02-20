<template>
    <section class="page page-list-contract" ref="wrapper">
        <div class="content">
            <Loading v-show="$store.state.isLoading"/>
            <p
                    v-show="dev==='development'?true:false"
                    @click="clearToken"
                    style="text-align: center;padding-top: 20px;"
            >清除token</p>
            <!--{{process.env.NODE_ENV}}-->
            <ul class="list-contract" v-show="!$store.state.isLoading">
                <li v-for="item in list">
                    <router-link :to="{name:'contractdetail', query: { contractId: item.contractId }}">
                        <header class="contract-title">
                            <span>申请号：{{item.approveNo}}</span>
                            <strong
                                    :class="[item.repayStatus==='还款中'?'color-red':'color-green']"
                            >{{item.repayStatus}}</strong>
                        </header>
                        <section>
                            <ol>
                                <li><span>申请购车人</span><span>{{item.customerName}}</span></li>
                                <li><span>选择车型</span><span>{{item.carMode}}</span></li>
                                <li>
                                    <span>贷款金额</span>
                                    <span>{{nfmoney(item.loanTotal*100)}}</span>
                                </li>
                                <li><span>还款期数</span><span>{{item.loanPeriod}} 期</span></li>
                                <li><span>申请时间</span><span>{{item.approveTime}}</span></li>
                            </ol>
                        </section>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>
<style scoped lang="less">
    .list-contract {
        margin-top: .4rem;
        > li {
            background: #ffffff;
            border-bottom: 1px solid #E5E5E5;
            border-top: 1px solid #E5E5E5;

            margin-bottom: .2rem;

        }
        a {
            color: #808080;
            display: block;
        }
        header {
            height: .94rem;
            display: flex;
            padding: 0.1rem .3rem;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E5E5E5;
            font-size: .34rem;
        }
        section {
            padding: .2rem .3rem;
            line-height: .56rem;
            li {
                display: flex;
                justify-content: space-between;
            }
        }
        .color-red {
            color: #FF0000;
        }
        .color-green {
            color: #1AAD1A;
        }
    }
</style>
<script>
    import BScroll from 'better-scroll'
    import Loading from './../components/Loading'
    import {nfmoney,setCookie} from './../lib/utils'
    import {getContractList} from './../server'

    export default {
        name: 'listcontract',
        data() {
            return {
                list: [],
                dev:process.env.NODE_ENV,
                nfmoney
            }
        },
        components: {
            Loading
        },
        methods:{
            clearToken(){
                localStorage.removeItem('token');
                localStorage.removeItem('openId');
                setCookie('token','',-1);
                setCookie('openId','',-1);
            }
        },
        mounted() {
            this.$nextTick(() => {
                new BScroll(this.$refs.wrapper, {
                    click: true,
                })
            })
        },
        async created() {
            let {list, status} = await getContractList();
            if (status !== 'success') return;
            this.list = list;
        }
    }
</script>
