import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {getCookie} from './../lib/utils'
export default new Vuex.Store({
    state: {
        token:localStorage.getItem("token")||getCookie("token")||'',
        isLoading: true,
        msg:'',
        openId:localStorage.getItem("openId")||getCookie("openId")||'noGetOpenId',
        openAgree:false,
        modalBtnCancel:false,
        fn:null
    },
    mutations: {
        updatedIsLoading(state,loading){
            state.isLoading = loading;
        },
        alertModal(state,payload){
            let {msg,modalBtnCancel,fn}=payload;
            state.msg = msg||'';
            if(modalBtnCancel){
                state.modalBtnCancel = modalBtnCancel||false;
            }else{
                state.modalBtnCancel=false;
            }
            if((typeof fn)==='function'){
                state.fn =fn;
            }else{
                state.fn=null;
            }
        },
        updatedOpenAgree(state,onOff){
            state.openAgree = onOff;
        }
    },
    actions: {

    }
})
