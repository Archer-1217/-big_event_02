$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
        ],
        repwd: function (value) {
            if (value !== $('.reg-box input[name=password]').val())
                return "两次密码输入不一致!"
        }
    })

    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.alert(res.message, { icon: 2 })
                }
                layer.alert(res.message, { icon: 1 });

                $('#link_reg').click();
                $('#form_reg')[0].reset();
            }
        })
    })


    $('#form_login').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.alert(res.message, { icon: 2 });
                }

                layer.alert(res.message, { icon: 1 });

                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})

