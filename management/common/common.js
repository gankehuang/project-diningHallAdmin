
//序列化表单内容为json对象 @returns {{object}}
$.fn.serializeJson = function (data) {
    var serializeObj = data ? data : {};
    $(this.serializeArray()).each(function () {
        //serializeObj 将页面表单序列化成一个JSON结构的对象
        if (serializeObj[this.name]) {
            //修正name相同的checkbox多选框取值问题，逗号分隔的字符串
            serializeObj[this.name] += ',' + $.trim(this.value);
        } else {
            serializeObj[this.name] = $.trim(this.value);
        }
    });
    return serializeObj;
};

//重置查询(全部) 
$.fn.resetSearch = function () {
    var $form = $(this);
    //重置搜索表单
    $form.get(0).reset();
    return {};
};

//反填表单数据
$.fn.formFieldValues = function (data) {
    var els = this.find(':input').get();

    if (arguments.length === 0) {
        return this.serializeJson();
    } else {
        $.each(els, function () {
            if (this.name && data[this.name]) {
                var names = data[this.name];
                var $this = $(this);
                if (Object.prototype.toString.call(names) !== '[object Array]') {
                    names = [names]; //backwards compat to old version of this code
                }
                //console.info(this.type + ","  + names)
                if (this.type == 'checkbox' || this.type == 'radio') {
                    var val = $this.val();
                    var found = false;
                    var arr = names[0].toString().split(','); //后台传来的是逗号分隔的字符串

                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j] == val) {
                            found = true;
                            break;
                        }
                    }
                    $this.prop("checked", found);
                } else {
                    $this.val(names[0]);
                }
                $this.trigger('change'); //触发修改事件
            }
        });
        return this;
    }
};


//发送ajax
function sendAjax(url, type) {
    var val
    $.ajax({
        url: url,
        type: "post",
        data: type,//序列化的数据
        async: false, 
        success: function (data, textStatus, xhr) {
            if(data.success == 1) {
                val = JSON.parse(data.resultData);
            }
        },
        error: function () {
            //alert( "系统错误!")
        }
    })
    return val;
}
function sendAjax2(url, type, cb) {
    var val
    $.ajax({
        url: url,
        type: "post",
        data: type,//序列化的数据
        async: false, 
        success: function (data, textStatus, xhr) {
            if(data.success == 1) {
                val = JSON.parse(data.resultData);
                cb(val);
            }
        },
        error: function () {
            //alert( "系统错误!")
        }
    })
  
}
function sendAjax1(url, type, cb) {
    var val
    $.ajax({
        url: url,
        type: "post",
        data: type,//序列化的数据
        async: false, 
        success: function (data, textStatus, xhr) {
            cb(data);
        },
        error: function () {
            //alert( "系统错误!")
        }
    })
}


$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    statusCode: {
        600: function () {
            alert('登录超时');
            window.parent.location.href = '/index.html';
        }
    }
});


//请求头添加判断参数
$.ajaxSetup({
    //dataType: 'json',
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    beforeSend: function (xhr) {
        xhr.setRequestHeader('PlatForm', 'admin');
    }
});




//获取用户cookie信息
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}



//输入金额验证
function check(e) {
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if (e.value != "") {
        if (!re.test(e.value)) {
            alert("请输入正确的数字");
            e.value = "";
            e.focus();
        }
    }
}

//上传文件
function uploading(imgUpload, uploading, imgBoxs) {   //1:上传按钮imgUpload， 2：显示正在上传uploading，3：上传回填imgBoxs，4：
    imgUpload.fileupload({
        url: Server.service.UploadFJ,
        limitMultiFileUploadSize: 200 * 1024 * 1024,
        limitMultiFileUploads: 1,
        maxFileSize: 200 * 1024 * 1024,
        headers: {
            FileDesc: "22",
            FileType: 0,
        },
        minFileSize: 1,
        add: function (e, data) {
            var tooLarge = false;
            for (var i in data.files) {
                if (data.files[i].size > 25 * 1024 * 1024) {   //文件大小
                    tooLarge = true;
                }
            }
            if (tooLarge) {
                Server.warning("show", "文件大小不能超过25M");
                return false;
            }
            $('.file-btn').attr('disabled', true);
            uploading.html('正在上传...');

            console.log('#######', imgUpload);
            //上传前处理
            var len = imgBoxs.find(".img-responsive").length;
            if (len < 10) {
                data.submit();//提交上传文件
            } else {
                Server.warning("show", "最多只能上传10个文件");
                return false;
            }

        },
        done: function (e, data) {
            var data = data.result;//不能去掉
            //上传完成处理返回值 
            if (data.success) {
                uploading.html('上传附件');
                $('.file-btn').attr({ 'disabled': false });
                //{"success":1,"message":"上传成功","resultData":"[{\"Url\":\"/Pic/Koala636559280894666904.jpg\"}]"}
                data.resultData = JSON.parse(data.resultData);
                $("input[name='imagePath']").val(data.resultData[0].Url)
                var imagepath1 = data.resultData[0].Url;
                var index1 = imagepath1.indexOf("FJ/");
                var index2 = imagepath1.indexOf("_FJ");
                var index3 = imagepath1.lastIndexOf(".");
                var imagepathname = imagepath1.substring(index1 + 3, index2) + imagepath1.substring(index3);
                // data.resultData[0].Url = data.resultData[0].Url.match(/FJ\/(\S*)/)[1];
                var imglist = { 'resultData': [{ 'Url': imagepathname, 'path': imagepath1 }] }
                imgBoxs.append(template("imgTpl", imglist));
            } else {
                Server.error("show", data.message);
            }

        }
    });
}


//导出数据
function exportData(type) {
    var $a = $("<a>");
    $a.attr("href", Server.service.OutExcelByType +'?userid='+ getCookie('lookAt') + '&type='+ type  );
    $a.attr("download", 'test.xls');
    $("body").append($a);
    $a[0].click();
    $a.remove();
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


//获取勾选值
function checkValue(ele) {
    let obtainedYearCheck = '';
    ele.find('input').each(function(i){
        if($(this).prop('checked')) {
            obtainedYearCheck += $(this).attr('name') + ','; 
        }
    });
    obtainedYearCheck=obtainedYearCheck.substring(0,obtainedYearCheck.length-1)
    return obtainedYearCheck;
}   