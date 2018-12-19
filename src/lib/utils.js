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

export function nfmoney(s, power, n, type) {
    /**转换金额
     * s:金额（单位：默认为分）
     * power:10的几次冥次方（默认为-2）
     * n:保留几位小数（默认为2）
     * type:s的类型（默认为金额）'':为金额，'z'为非金额,或非金额转换的数值,则power和n必传
     */
    var fuzhi = false;
    if (s === '' || s === undefined || s === null) {
        return '暂无数据';
    }
    if (s < 0) {
        fuzhi = true;
        s = Math.abs(s);
    }
    power = (type !== 'z') ? (power || -2) : power;
    s = (parseFloat(s) * Math.pow(10, power));
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
    var l = s.split('.')[0].split('').reverse(),
        r = (type === 'z' && n === 0) ? '' : (n === 0 ? '' : s.split('.')[1]);
    var t = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) != l.length ? ',' : '');
    }
    return (fuzhi ? '-' : '') + t.split('').reverse().join('') + (r !== '' ? ('.' + r) : '');
}
