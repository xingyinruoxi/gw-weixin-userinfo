<template>
    <div id="mask" v-show="onOff">
        <dl class="modtal">
            <dt>温馨提示</dt>
            <dd>
                <p>{{$store.state.msg}}</p>
                <footer class="modal-footer">
                    <a href="javascript:;"
                       v-if="$store.state.modalBtnCancel"
                       class="btn-cancel"
                       @click="clickCancel"
                    >取消</a>
                    <a
                            href="javascript:;"
                            class="btn-ok"
                            @click="clickOk"
                    >确定</a>
                </footer>
            </dd>
        </dl>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                onOff: this.$store.state.msg ? true : false
            }
        },
        props: {
            msg: String
        },
        updated() {
            this.onOff = this.$store.state.msg ? true : false
        },
        methods: {
            closeModal() {
                this.$store.commit('alertModal', {msg: ''})
            },
            clickOk() {
                if ((typeof this.$store.state.fn) === 'function') {
                    this.$store.state.fn();
                    this.$store.commit('alertModal', {msg: '', modalBtnCancel: false, fn: null});
                } else {
                    this.closeModal();
                }
            },
            clickCancel() {
                this.closeModal();
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

    .modal-footer {
        border-top: 1px solid #D5D5D6;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        a {
            height: 100%;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .btn-cancel {
            border-right: 1px solid #D5D5D6;
        }
    }

    .modtal {
        background: #ffffff;
        width: 5.6rem;
        border-radius: 4px;
        overflow: hidden;
        text-align: center;
        dt {
            font-size: .38rem;
            padding-top: .4rem;
            font-weight: bold;
        }
        dd {
            p {
                color: #808080;
                padding: 20px;
            }
        }
        .btn-ok {
            color: #0ABB08;

        }
    }
</style>