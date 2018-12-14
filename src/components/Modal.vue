<template>
    <div id="mask" v-show="onOff">
        <dl class="modtal">
            <dt>温馨提示</dt>
            <dd>
                <p>{{$store.state.msg}}</p>
                <a
                        href="javascript:;"
                        class="btn-close"
                        @click="closeModal"
                >确定</a>
            </dd>
        </dl>
    </div>
</template>
<script>
    import store from './../store'
    export default {
        data(){
            return {
                onOff:this.$store.state.msg?true:false
            }
        },
        props: {
            msg: String
        },
        updated(){
            this.onOff=this.$store.state.msg?true:false
        },
        methods:{
            closeModal(){
                store.commit('alertModal','')
            }
        }
    }
</script>
<style scoped lang="less">
    #mask {
        transition: 1s;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .7);
        width: 100vw;
        height: 100vh;
        z-index: 7777;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modtal {
        background: #ffffff;
        width: 5.6rem;
        text-align: center;
        dt {
            font-size: .36rem;
            padding-top: .4rem;
        }
        dd {
            padding-left: .4rem;
            padding-right: .4rem;
            padding-top: .2rem;
            p {
                color: #666666;
            }
        }
        .btn-close {
            background: #1AAD1A;
            margin-bottom: .2rem;
            height: .68rem;
            display: flex;
            color: #ffffff;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            margin-top: .4rem;
        }
    }
</style>