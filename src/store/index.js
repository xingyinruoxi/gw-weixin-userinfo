import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token:localStorage.getItem("token")||'',
        isLoading: true,
        msg:'',
        openId:localStorage.getItem("openId")||'poiuytre',
        openAgree:false
    },
    mutations: {
        updatedIsLoading(state,loading){
            state.isLoading = loading;
        },
        alertModal(state,msg){
            state.msg = msg;
        },
        updatedOpenAgree(state,onOff){
            state.openAgree = onOff;
        }
    },
    actions: {

    }
})
