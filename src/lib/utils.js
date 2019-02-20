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

//设置cookie
export function setCookie(c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =c_name +"=" +escape(value) +(expiredays == null ? "" : ";expires=" + exdate.toGMTString());
  }

  //取回cookie
  export function  getCookie(c_name) {
    let c_start='';
    let c_end='';
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  }

  export function delCookie(c_name)
  {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(c_name);
  if(cval!=null)
  document.cookie= c_name + "="+cval+";expires="+exp.toGMTString();
  }