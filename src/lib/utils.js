/**
 * Vue的插件，用来获取和设置localStorage存储
 **/
let local = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    fetch(key) {
        return JSON.parse(localStorage.getItem(key)) || {}
    }
}

export default {
    install: function (vm) {
        vm.prototype.$local = local
    }
}

export function isLogin() {
    if (!localStorage.token || localStorage.token == "") {
        return false;
    } else {
        return true;
    }
}
