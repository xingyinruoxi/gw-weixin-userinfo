<template>
    <section class="page page-layout">
        <div class="list-block">
            <ul style="margin-top: 0;">
                <li>
                    <div class="item-content" style="height: 1.2rem;">
                        <div
                                class="item-title label"
                                style="font-size: .54rem;font-weight: bold;"
                        >{{userName}}
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-title label">证件类型</div>
                        <div class="item-text">
                            <span>{{idCard}}</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-title label">手机号</div>
                        <div class="item-text">
                            <span>{{phone}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <footer>
            <button
                    @click="layout"
                    class="btn btn-submit">

                账号解绑
            </button>
        </footer>
    </section>
</template>
<style scoped lang="less">
    .page-layout {
        .list-block {
            flex: 1;
        }
    }

    .item-text {
        align-items: center;
        display: flex;
    }

    footer {
        padding: .2rem .4rem;
    }

    .btn-submit {
        background: #FF0000;
    }
</style>
<script>
    import {layout, getUserInfo} from './../server'

    export default {
        data() {
            return {
                userName: '',
                idCard: '',
                phone: ''
            }
        },
        methods: {
            async layout() {
                let {code} = this.$route.query;
                let token = localStorage.getItem('token');
                let {status} = await layout({token});
                if (status !== "success") return;
                localStorage.removeItem('token');
                this.$router.push({path: '/login', query: {code}});
            }
        },
        async created() {
            let {userName, status, idCard, phone} = await getUserInfo();
            if (status !== 'success') return;
            this.userName = userName;
            this.idCard = idCard;
            this.phone = phone;
        }
    }
</script>