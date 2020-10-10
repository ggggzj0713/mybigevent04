var baseurl = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(value) {
    value.url = baseurl + value.url
})