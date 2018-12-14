<template>
    <li>
        <router-link :to="{name:'contractdetail', query: { userId: 123 }}">
            <header class="contract-title">
                <span>申请号：OL-A000004200</span>
                <strong class="color-red">还款中</strong>
            </header>
            <section>
                <ol>
                    <li><span>申请购车人</span><span>杨国俊</span></li>
                    <li><span>选择车型</span><span>欧拉R1 高配版</span></li>
                    <li><span>贷款金额</span><span>100,000.00</span></li>
                    <li><span>还款期数</span><span>12 期</span></li>
                    <li><span>申请时间</span><span>2018-11-15 10:07:45</span></li>
                </ol>
            </section>
        </router-link>
    </li>
</template>
<script>
    export default {
        name:'itemcontract',

    }
</script>