// 每次调用ajax函数时，会先调用ajaxPrefilter（）这个函数
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url


    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})