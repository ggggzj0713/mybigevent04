var baseurl = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(value) {
    value.url = baseurl + value.url;
    if (value.url.indexOf('/my/') !== -1) {
        value.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    value.complete = function(res) {
        // console.log(res);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }

    }
})