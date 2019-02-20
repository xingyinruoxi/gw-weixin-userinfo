import axios from 'axios'
import store from '@/store'
import {getCookie} from './../lib/utils'

let server = axios.create({
    responseType: 'json'
});
server.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')||getCookie('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    store.commit('updatedIsLoading', true)
    return config;
}, function (err) {
    return Promise.reject(err);
});

function fetch(url, param = {}) {
    return new Promise((resolve, reject) => {
        server.post(url, param)
            .then(({data}) => {
                let {status,msg}=data;
                store.commit('updatedIsLoading', false);
                if(status!=='success'){
                    store.commit('alertModal', {msg});
                }
                resolve(data);
            }, err => {
                store.commit('alertModal', {msg:'网络错误'});
                reject(err)
            })
    })
}

// 获取短信验证码
export const getMobileCode = (param) => {
    return fetch('/api/auth/sendCode', param);
};

// 获取登录信息
export const doLogin = (param) => {
    return fetch('/api/auth/login', param);
};

// 获取合同详情
export const getContractDetail = (param) => {
    return fetch('/api/auth/contractDetail', param);
};
// 获取还款计划
export const getPlanInfo = (param) => {
    return fetch('/api/auth/plan', param);
};

// 获取合同列表
export const getContractList = (param) => {
    return fetch('/api/auth/contract', param);
};

// 获取openId
export const getOpenId = (param) => {
    return fetch('/api/wx/getOpenId', param);
};

// 退出登录
export const layout = (param) => {
    return fetch('/api/auth/logout', param);
};
// 获取用户信息
export const getUserInfo = () => {
    return fetch('/api/auth/getUserInfo');
};