$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 选择文件
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    });
    // 修改裁剪图片
    $('#file').on('change', function(e) {
        var files = e.target.files;
        if (files.length == 0) {
            return layer.msg('请选择图片')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
            // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
            // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });
    // 上传头像
    $('#btnUpload').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更换头像成功');
                window.parent.getUserInfo();
            }
        })


    });

    getimage();
    // 重新渲染头像
    function getimage() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', res.data.user_pic) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }
        })
    }
});