<template>
  <section class="page page-login">
    <!-- <Agreement/> -->
    <div class="list-block">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-title label">姓名</div>
            <div class="item-input">
              <input
                type="text"
                placeholder="请输入姓名"
                maxlength="4"
                v-model="userInfo.userName"
                @keyup="keyupChange('userNameErrer')"
                @blur="checkCard(userInfo.userName)"
              >
            </div>
            <div class="item-after" v-show="errers.userNameErrer">
              <FormErrer/>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-title label">手机号</div>
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
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-title label">验证码</div>
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
            <div class="item-after item-after-code">
              <button class="link-code" @click="sendCode">获取验证码</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="list-block-label" style="display: block">温馨提示：每天获取验证码不能超过3次</div>
    </div>
    <!--  <footer>
            <div class="check-box">
                <label>
                    <input
                            type="checkbox"
                            v-model="checked"
                    />
                    <span>&nbsp;</span>
                    我已阅读并同意
                </label>
                <a
                        href="javascript:;"
                        @click="openAgreement"
                >《欧拉融资租赁账号绑定协议》</a>
            </div>
            <button
                    class="btn btn-submit"
                    :disabled="!onOff"
                    @click="clickSubmit"
            >确定
            </button>
    </footer>-->
    <button class="btn btn-submit" :disabled="!onOff" @click="clickSubmit">确定</button>
  </section>
</template>
<script>
import FormErrer from "./../components/FormErrer";
// import Agreement from "./../components/Agreement";
import { getMobileCode, doLogin, getOpenId } from "./../server";
import { isLogin, getCookie, setCookie } from "./../lib/utils";

export default {
  name: "login",
  components: {
    FormErrer
    // Agreement
  },
  data() {
    return {
      // checked: false,
      userInfo: {
        userName: "",
        phone: "",
        code: "",
        openId: this.$store.state.openId || "noGetOpenId"
      },
      errers: {
        userNameErrer: false,
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

  async beforeCreate() {
    /*  this.$store.commit("alertModal");
    if (isLogin()) {
      this.$router.push({ path: "/contractdetail" });
    } else {
      let { code } = this.$route.query;
      let { status, openId } = await getOpenId({ grantCode: code });
      if (status !== "success") return;
      localStorage.setItem("openId", openId);
      this.$router.push({ path: "/contractdetail" });
    } */
  },
  methods: {
    /* openAgreement() {
      this.$store.commit("updatedOpenAgree", true);
    }, */

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
    checkCard(userName) {
      let reg = /^[\u4e00-\u9fa5]{2,4}$/;
      if (reg.test(userName) === false) {
        this.errers.userNameErrer = true;
        this.checkSubmit();
        return false;
      } else {
        this.errers.userNameErrer = false;
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
      console.log("getCookie", getCookie("username"));
      let { phone } = this.userInfo;
      // console.log(phone);
      /* let hasPhone = this.checkphone(phone);
      if (!hasPhone) return;
      let data = await getMobileCode({ phone });
      if (data.status !== "success") return;
      var num = 90;
      var timer = setInterval(function() {
        num--;
        target.innerHTML = num + "秒后重新获取";
        target.style.color = "#808080";
        target.disabled = " disabled";
        if (num === 0) {
          target.style.color = "#1AAD1A";
          target.disabled = "";
          target.innerHTML = "获取验证码";
          clearInterval(timer);
        }
      }, 1000); */
    },
    async clickSubmit() {
      console.log("234567890", this.userInfo);
      setCookie("username", "周林123", 365);
      /* if (this.checked) {
                    let {token, status} = await doLogin(this.userInfo);
                    if (status !== 'success') return;
                    localStorage.setItem("token", token);
                    this.$router.push({path: '/contractdetail'})
                } else {
                    this.$store.commit('alertModal', {msg:'请仔细阅读《欧拉融资租赁账号绑定协议》，同意后可进行账号绑定操作'})
                } */
    }
  }
};
</script>
<style scoped lang="less">
.page-login {
  min-height: 500px;
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

.list-block .item-title.label {
  color: #000;
  width: 30%;
  font-size: 0.3rem;
}

.item-after-code {
  border-left: 1px solid #e5e5e5;
  padding-left: 0.3rem;
  padding-right: 0.2rem;
  position: relative;
}

/* .item-after-code:after{
         content: " ";
         position: absolute;
         box-sizing: border-box;
         left: 0;
         top: 0;
         right: 0;
         height: 1px;
         !*border-bottom: 1px solid #E5E5E5;*!
         background-color: #E5E5E5;
         !*background-color: #000;*!
         width: .94rem;
         !*width:60px;*!
         display: block;
         z-index: 64;
         -webkit-transform-origin: 0 0;
         transform-origin: 0 0;
     }
     @media only screen and (-webkit-min-device-pixel-ratio: 2) {
         .item-after-code:after {
             -webkit-transform: scaleY(0.5);
             transform: scaleY(0.5);
             transform:rotate(90deg);
             -ms-transform:rotate(90deg); 	!* IE 9 *!
             -moz-transform:rotate(90deg); 	!* Firefox *!
             -webkit-transform:rotate(90deg); !* Safari 和 Chrome *!
             -o-transform:rotate(90deg); 	!* Opera *!
         }
     }
     @media only screen and (-webkit-min-device-pixel-ratio: 3) {
         .item-after-code:after {
             -webkit-transform: scaleY(0.33);
             transform: scaleY(0.33);
             transform:rotate(90deg);
             -ms-transform:rotate(90deg); 	!* IE 9 *!
             -moz-transform:rotate(90deg); 	!* Firefox *!
             -webkit-transform:rotate(90deg); !* Safari 和 Chrome *!
             -o-transform:rotate(90deg); 	!* Opera *!
         }
     }*/
.item-after-code .link-code {
  color: #1aad1a;
  font-size: 0.3rem;
}

.list-block {
  flex: 1;
  display: flex;
  flex-direction: column;
}

footer {
  padding: 0.2rem 0.4rem;
}

.btn-submit:disabled {
  background: #bae6ba;
}
</style>