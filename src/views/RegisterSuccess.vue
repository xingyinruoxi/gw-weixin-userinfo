<template>
  <article class="page page-registersuccess" ref="wrapper">
    <div class="content">
      <div class="banner">
        <img src="../assets/img/queslist/banner-result.png" width="100%">
      </div>
      <div class="result">
        <img src="../assets/img/queslist/result-ok.png" alt width="111" height="111">
        <strong>注册成功</strong>
      </div>
      <footer>
        <h5 class="title">调查问卷</h5>
        <ul>
          <li>
            <div>1.全款购车和贷款购车，您更倾向于哪种购车方式</div>
            <span>{{buyType}}</span>
          </li>
          <li>
            <div>2.以下品牌您更倾向于</div>
            <span>{{carModel}}</span>
          </li>
          <li>
            <div>3.您更倾向购买多少钱的车型</div>
            <span>{{money}}</span>
          </li>
        </ul>
      </footer>
    </div>
  </article>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    const {buyType,carModel,money}=this.$route.query;
    return {
      buyType,
      carModel,
      money
    };
  },
  mounted() {
    
    this.initBScoll();
  },
  methods: {
    initBScoll() {
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, { click: true });
      });
    }
  }
};
</script>
<style scoped lang="less">
.page-registersuccess {
  background: #ffffff;
  .result {
    height: 240px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    strong {
      padding-top: 15px;
      color: #333;
      font-size: 17px;
    }
  }
  .title{
      margin: 0;
      padding-top: 20px;
  }
  li{
      div{
          font-size: 14px;
          color: #666;
          font-weight: 500;
          padding-bottom: 10px;
          padding-top: 20px;
      }
      span{
          color: #666666;
          font-size: 13px;
      }
  }
  footer{
      padding: 0 .8rem;
      h5{
          font-size: 16px;
          color: #666666;
      }
  }
}
</style>