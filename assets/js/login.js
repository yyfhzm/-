$(function () {
    //点击注册账号的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录的链接
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layu中获取form对象
    var form = layui.form
    // 通过form.verify（）函数自定义校验规则
    form.verify({
        // 自定义pwd校验规则
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码不一致'
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax 的post请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);

                layer.msg('注册成功，快去登录吧');
                $('#link-login').click()
            }
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        // var data = { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() }
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);

                layer.msg('正在登录...');
                // console.log(res.token);
                // 将成功登录得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转后台主页
                location.href = '/index.html'
            }
        })
    })
})
