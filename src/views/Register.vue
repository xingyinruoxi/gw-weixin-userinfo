<template>
  <section class="page page-register">
    <div class="logo">
      <img src="../assets/img/queslist/logo.png" alt="logo图片" width="99" height="90">
    </div>
    <div class="list-block">
      <ul>
        <li class="item-content">
          <div class="item-input">
            <input
              type="tel"
              placeholder="请输入手机号"
              maxlength="11"
              @keyup="keyupChange('phoneErrer')"
              v-model="userInfo.phone"
              @blur="checkphone(userInfo.phone)"
            >
          </div>
          <div class="item-after" v-show="errers.phoneErrer">
            <FormErrer/>
          </div>
        </li>
        <li class="item-li">
          <div class="item-content">
          <div class="item-input">
            <input
              placeholder="请输入验证码"
              maxlength="4"
              @keyup="keyupChange('codeErrer')"
              v-model="userInfo.code"
              @blur="checkCode(userInfo.code)"
            >
          </div>
          <div class="item-after" v-show="errers.codeErrer">
            <FormErrer/>&nbsp;&nbsp;
          </div>
         
          <!-- <div class="line">&nbsp;</div> -->
          </div>
           <div class="item-after item-after-code" ref="getCode">
            <button class="link-code" @click="sendCode">获取验证码</button>
          </div>
        </li>
      </ul>
    </div>

    <button class="btn btn-submit" :disabled="!onOff" @click="clickSubmit">注册</button>
  </section>
</template>
<script>
import FormErrer from "./../components/FormErrer";
import { getMobileCode, doRegister, getOpenId } from "./../server";
// import { isLogin } from "./../lib/utils";

export default {
  name: "register",
  components: {
    FormErrer
  },
  data() {
    return {
      // checked: false,
      userInfo: {
        phone: "",
        code: "",
        openId: this.$store.state.openId || "noGetOpenId"
      },
      errers: {
        phoneErrer: false,
        codeErrer: false
      },
      onOff: false
    };
  },
  watch: {
    userInfo: {
      handler(newName, oldName) {
        this.checkSubmit();
      },
      deep: true
    }
    /* errers:{
                 handler(newName, oldName) {
                     this.checkSubmit()
                 },
                 deep: true
             }*/
  },
  methods: {
    checkphone(phone) {
      let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (!reg.test(phone)) {
        this.errers.phoneErrer = true;
        this.checkSubmit();
        return false;
      } else {
        this.errers.phoneErrer = false;
        return true;
      }
    },
    keyupChange(obj) {
      this.errers[obj] = false;
    },
    checkCode(code) {
      let reg = /^\d{4}$/;
      if (reg.test(code) === false) {
        this.errers.codeErrer = true;
        this.checkSubmit();
        return false;
      } else {
        this.errers.codeErrer = false;
        return true;
      }
    },
    checkSubmit() {
      let userInfoResult = Object.values(this.userInfo).every(item => {
        return item !== "";
      });
      let errerResult = Object.values(this.errers).every(item => {
        return item !== true;
      });
      // console.log('errerResult:',errerResult,'userInfoResult',userInfoResult);
      this.onOff = errerResult && userInfoResult;
      // this.onOff = userInfoResult;
    },
    async sendCode({ target }) {
      let { getCode } = this.$refs;
      let { phone } = this.userInfo;
      let hasPhone = this.checkphone(phone);
      if (!hasPhone) return;
      let data = await getMobileCode({ phone });
      if (data.status !== "success") return;
      var num = 90;

      var timer = setInterval(function() {
        num--;
        target.innerHTML = num + "秒后重新获取";
        target.style.color = "#fff";
        getCode.style.background = "#DEDEDE";
        target.disabled = " disabled";
        if (num === 0) {
          target.style.color = "#fff";
          getCode.style.background = "#E50113";
          target.disabled = "";
          target.innerHTML = "获取验证码";
          clearInterval(timer);
        }
      }, 1000);
    },
    async clickSubmit() {
      //  this.$router.push({ path: "/questionlist" });
      let data = await doRegister(this.userInfo);
      //  if (status !== "success") return;
      console.log("data", data);
      /*   let {status } = await doRegister(this.userInfo);
      if (status !== "success") return;
      this.$router.push({ path: "/questionlist" }); */
    }
  }
};
</script>
<style scoped lang="less">
.page-register {
  min-height: 500px;
  background: #ffffff;
  padding: 0 40px;
  .item-li{
    display: flex;
  }
  .logo {
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .line {
    background: #fff;
    position: absolute;
    right: 0;
    height: 1px;
    bottom: -1px;
    width: 126px;
  }
}

.check-box {
  font-size: 0.26rem;
  padding-bottom: 15px;
  label {
    color: #808080;
  }
  a {
    color: #586c94;
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

.item-after-code {
  padding-left: 0.3rem; 
  padding-right: 0.2rem;              
  position: relative;
  background: #e50113;
  border-radius: 22px;
  height: 36px;
  top: 4px;
  white-space: nowrap;
  margin-left: 10px;
}

.item-after-code .link-code {
  color: #fff;
  font-size: 0.3rem;
}

.list-block {
  display: flex;
  flex-direction: column;
  ul {
    border-top: none;
    margin-top: 0;
  }
}

.list-block .item-content {
  border-color: #999;
  padding: 0 0.1rem;
  margin-bottom: 10px;
}
.btn-submit {
  margin-top: 20px;
  background: #e50113;
  border-radius: 22px;
  font-size: 17px;
}
.btn-submit:disabled {
  background: #dedede;
}
</style>