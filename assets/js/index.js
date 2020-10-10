$(function() {
    getUserInfo();

    // 退出登录
    $('#btnLogout').on('click', function() {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
});
var form = layui.form;
var layer = layui.layer;
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderAvatar(res.data);
        }
    });
}

// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.user-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.user-avatar').html(first).show();

    }
}