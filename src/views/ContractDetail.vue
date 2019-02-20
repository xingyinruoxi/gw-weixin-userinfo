<template>
  <article class="page page-contract-list">
    <header>
      <div class="userinfo">
        <strong>{{customerPerson.fullname}}</strong>
        <ul>
          <li class="arrow-wrap">
            申请编号：{{customerPerson.approveNo}}
            <i
              @click="toggleClick"
              class="ico-arrow"
              :class="{active:toggleStatus}"
            >&nbsp;</i>
          </li>
          <li v-show="toggleStatus">身份证号：{{customerPerson.idCard}}</li>
          <li v-show="toggleStatus">手机号码：{{customerPerson.phone}}</li>
        </ul>
        <span v-show="toggleStatus" v-if="guarantPerson">担保人信息</span>
        <ul v-show="toggleStatus" v-if="guarantPerson">
          <li>姓名：{{guarantPerson.fullname}}</li>
          <li>身份证号：{{guarantPerson.idCard}}</li>
          <li>手机号码：{{guarantPerson.phone}}</li>
        </ul>
      </div>
      <router-link to="/contractlist" class="tab-btn">
        <img src="./../assets/img/refresh.png" alt="刷新" width="20">
        <span>切换合同</span>
      </router-link>
    </header>
    <nav class="nav-tabs">
      <a
        href="javascript:;"
        v-for="(item,index) in navTitles"
        :class="{active:index===iNow}"
        @click="tabToggle(index)"
      >
        <span>{{item}}</span>
      </a>
    </nav>
    <section class="tabs" ref="wrapper">
      <div class="content">
        <Loading v-show="$store.state.isLoading"/>
        <section v-show="!$store.state.isLoading" style="padding-bottom: 60px;">
          <div class="tab" v-show="iNow===0">
            <div class="content-block-title">贷款方案</div>
            <ul class="list-contract">
              <li>
                <label>还款状态</label>
                <span>{{list.repayStatus}}</span>
              </li>
              <li>
                <label>贷款金额</label>
                <span>{{nfmoney(list.loanTotal*100)}} 元</span>
              </li>
              <li>
                <label>贷款期数</label>
                <span>{{list.loanPeriod}} 期</span>
              </li>
              <li>
                <label>还款银行</label>
                <span>{{list.repayBank}}</span>
              </li>
              <li>
                <label>还款卡号</label>
                <span>{{list.repayCard}}</span>
              </li>
              <li>
                <label>起租时间</label>
                <span>{{list.rentSDate}}</span>
              </li>
              <li>
                <label>截止时间</label>
                <span>{{list.rentEDate}}</span>
              </li>
            </ul>
            <div class="content-block-title">车辆信息</div>
            <ul class="list-contract">
              <li>
                <label>生产厂商</label>
                <span>{{list.carMaker}}</span>
              </li>
              <li>
                <label>车辆品牌</label>
                <span>{{list.carBrand}}</span>
              </li>
              <li>
                <label>车型款式</label>
                <span>{{list.carMode}}</span>
              </li>
              <li>
                <label>车架号</label>
                <span>{{list.carVin}}</span>
              </li>
            </ul>
            <div class="list-block-label">如扣款日遇公休日、法定节假日，则顺延至节后第一个工作日扣款，不属于逾期行为。</div>
          </div>
          <div class="tab tab2" v-show="iNow===1">
            <div class="content-block-title list-title">
              <span>还款期数</span>
              <span>应还款日</span>
              <span>还款金额</span>
            </div>
            <ul class="list-contract">
              <li v-for="item in planInfo.list" :style="{color:(item.payState==='1')?'':'#000'}">
                <label>{{item.repayNum}}期{{item.payState==='1'?'(已还)':null}}</label>
                <time>{{item.repayDate}}</time>
                <span>{{nfmoney(item.repayMoney*100)}}</span>
              </li>
            </ul>
            <div class="total-num">
              <span>合计</span>
              <strong>{{nfmoney(planInfo.total*100)}}</strong>
            </div>
            <div class="list-block-label">如扣款日遇公休日、法定节假日，则顺延至节后第一个工作日扣款，不属于逾期行为。</div>
          </div>
        </section>
      </div>
    </section>
  </article>
</template>
<script>
import BScroll from "better-scroll";
import Loading from "./../components/Loading";
import { nfmoney } from "./../lib/utils";
import { getContractDetail, getPlanInfo } from "./../server";

export default {
  data() {
    return {
      toggleStatus: false,
      navTitles: ["合同信息", "还款计划"],
      iNow: 0,
      onOff: true,
      planInfo: {},
      customerPerson: {},
      guarantPerson: {},
      list: {},
      contractId: "",
      nfmoney
    };
  },
  async created() {
    // console.log(nfmoney(55.3*100));
    // localStorage.removeItem("token");
    let { contractId } = this.$route.query;
    let {
      customerPerson,
      guarantPerson,
      list,
      status
    } = await getContractDetail({ contractId });
    // console.log(customerPerson,guarantPerson,list,);
    if (status !== "success") return;
    this.customerPerson = customerPerson;
    this.guarantPerson = guarantPerson;
    this.list = list;
    this.contractId = list.contractId;
  },
  components: {
    Loading
  },
  mounted() {
    this.initBScoll();
  },
  methods: {
    toggleClick() {
      this.toggleStatus = !this.toggleStatus;
      this.initBScoll();
    },
    initBScoll() {
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {});
      });
    },

    async tabToggle(index) {
      this.iNow = index;
      this.initBScoll();
      if (this.iNow === 1 && this.onOff) {
        let { contractId } = this.$route.query;
        if (!contractId) {
          contractId = this.contractId;
        }
        this.planInfo = await getPlanInfo({ contractId });
        // console.log('this.planInfo',this.planInfo);
        this.onOff = false;
      }
    }
  }
};
</script>
<style scoped lang="less">
.arrow-wrap {
  display: flex;
  align-items: center;
}

.ico-arrow {
  display: inline-block;
  background: url("./../assets/img/arrow.png");
  background-size: 100%;
  margin-left: 4px;
  width: 16px;
  height: 10px;
  &.active {
    -moz-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    transform: scaleY(-1);
  }
}

.tabs {
  flex: 1;
  overflow: hidden;
}

.content-block-title {
  font-size: 0.3rem;
  color: #000000;
  line-height: 1rem;
  padding-left: 0.3rem;
  padding-top: 0.1rem;
}

.tab2 .list-contract {
  label,
  span {
    width: 2rem;
  }
}
.list-contract {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  padding: 0.2rem 0.3rem;
  color: #808080;
  font-size: 0.28rem;
  line-height: 0.62rem;

  span {
    text-align: right;
  }
  time {
    flex: 1;
    text-align: center;
  }
  li {
    display: flex;
    justify-content: space-between;
  }
}

.page-contract-list header {
  display: flex;
  background: #fff;
  padding: 0.3rem;
}

.userinfo {
  flex: 1;
  text-align: left;
  strong {
    font-size: 0.44rem;
  }
  li {
    color: #808080;
    font-size: 0.26rem;
    line-height: 0.4rem;
  }
  span {
    font-weight: bold;
    display: block;
    /*padding: 2px 0;*/
  }
  ul {
    padding-top: 4px;
  }
}

.tab-btn {
  width: 1.16rem;
  height: 0.94rem;
  background: #7fc97f;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  font-size: 0.18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  span {
    display: block;
    padding-top: 2px;
  }
}

.nav-tabs {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  height: 0.88rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    width: 50%;
    font-size: 0.3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    span {
      display: flex;
      box-sizing: border-box;
      height: 100%;
      align-items: center;
    }
    &.active {
      color: #1aad1a;
      span {
        border-bottom: 4px solid #1aad1a;
        font-weight: 600;
      }
    }
  }
  a:first-child {
    border-right: 1px solid #e5e5e5;
  }
}

.total-num {
  border-bottom: 1px solid #e5e5e5;
  height: 0.94rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  color: #808080;
  strong {
    color: #000;
    font-size: 0.38rem;
  }
}

.list-title {
  display: flex;
  justify-content: space-between;
  padding-right: 0.3rem;
}
</style>