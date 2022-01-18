$(function () {
    getUserInfo()
    // var layer = layui.layer
    //点击退出，退出页面功能
    $('#btnLogout').on('click', function () {
        //弹出选项框
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'

            // 关闭询问框
            layer.close(index);
        });
    })
})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        data: {},
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
            // 渲染用户的头像
            renderAvatar(res.data)
        }
        // 不论成功或者失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 欢饮文本
    var name = user.nikename || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if (user.user_pic !== null) {
        // 图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}