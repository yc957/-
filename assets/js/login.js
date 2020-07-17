$(function () {
    $('#loginBox').on('click', function () {
        $('.regBox').show()
        $('.loginBox').hide()
    })
    $('#regBox').on('click', function () {

        $('.loginBox').show()
        $('.regBox').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，而且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.regBox [name="password"]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        console.log(1);
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.regBox [name=username]').val(),
                password: $('.regBox [name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#loginBox').click()
            }

        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = './index.html'

            }

        })
    })

})