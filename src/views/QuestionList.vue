<template>
  <article class="page page-questions">
    <section class="content-wrap" ref="wrapper">
      <div class="content">
        <div class="banner">
          <img src="../assets/img/queslist/banner-list.png" width="100%">
        </div>
        <ul class="list-unstyled">
          <li>
            <h5>1.全款购车和贷款购车，您更倾向于哪种购车方式</h5>
            <label>
              <input type="radio" value="全款购车" v-model="buyType">
              <i class="ico-checkout">&nbsp;</i>
              <span>全款购车</span>
            </label>
            <label>
              <input type="radio" value="贷款购车" v-model="buyType">
              <i class="ico-checkout">&nbsp;</i>
              <span>贷款购车</span>
            </label>
          </li>
          <li>
            <h5>2.以下品牌，您更倾向于</h5>
            <label>
              <input type="radio" value="吉利" v-model="carModel">
              <i class="ico-checkout">&nbsp;</i>
              <span>吉利</span>
            </label>
            <label>
              <input type="radio" value="大众" v-model="carModel">
              <i class="ico-checkout">&nbsp;</i>
              <span>大众</span>
            </label>
            <label>
              <input type="radio" value="长城" v-model="carModel">
              <i class="ico-checkout">&nbsp;</i>
              <span>长城</span>
            </label>
            <label>
              <input type="radio" value="其他" v-model="carModel">
              <i class="ico-checkout">&nbsp;</i>
              <span>其他</span>
            </label>
          </li>
          <li>
            <h5>3.您更倾向于购买多少钱的车型</h5>
            <label>
              <input type="radio" value="10万以内" v-model="money">
              <i class="ico-checkout">&nbsp;</i>
              <span>10万以内</span>
            </label>
            <label>
              <input type="radio" value="10-15万" v-model="money">
              <i class="ico-checkout">&nbsp;</i>
              <span>10-15万</span>
            </label>
            <label>
              <input type="radio" value="15-20万" v-model="money">
              <i class="ico-checkout">&nbsp;</i>
              <span>15-20万</span>
            </label>
            <label>
              <input type="radio" value="20万以上" v-model="money">
              <i class="ico-checkout">&nbsp;</i>
              <span>20万以上</span>
            </label>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <button class="btn btn-success"
      :disabled="!this.onOff"
      @click="clickSubmit"
      >提交</button>
    </footer>
  </article>
</template>
<script>
import BScroll from "better-scroll";
import Loading from "./../components/Loading";

export default {
  data() {
    return {
      buyType: "",
      carModel: "",
      money: ""
    };
  },
computed: {
    onOff () {
      let arr=[this.money,this.buyType,this.carModel];
      return arr.every((item) => {
        return item!==''
         })
    }
  },
  mounted() {
    this.initBScoll();
  },
  methods: {
    initBScoll() {
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, { click: true });
      });
    },
    async clickSubmit() {
      let {buyType,carModel,money}=this;

       this.$router.push({ path: "/registersuccess",query:{buyType,carModel,money } });
    }
  }
};
</script>
<style scoped lang="less">
.content-wrap {
  flex: 1;
  overflow: hidden;
}
.page-questions {
  background: #fff;
  // overflow:hidden;
  input {
    display: none;
  }
  ul {
    padding: 0 0.4rem;
    padding-bottom: 100px;
  }

  li {
    // margin: 0;
    // padding: 0;
    padding-top: 0.75rem;

  }
  
  h5 {
    color: #333;
    font-size: 16px;
    margin: 0;
    font-weight: normal;
  }
  label {
    color: #666666;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding-top: 0.7rem;
    // margin-bottom: 0.7rem;
    &:active{
      background:red;
    }
  }
  input ~ i {
    display: inline-block;
    border: 1px solid #979797;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
  }
  input:checked ~ i {
    // border: none;
    border-color: #E50113;
    background: url("../assets/img/queslist/ico-checked.png") no-repeat center;
    background-size: 100%;
  }
}
footer{
  padding: 0 40px;
}
.btn-success {
  background: #E50113;
  color: #fff;
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  height: 44px;
  font-size: 17px;
  border-radius: 22px;
  margin: 20px 0;
}
.btn-success[disabled]{
  background: #DEDEDE;
  color: #fff;
}
</style>