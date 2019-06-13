var Server = function (api) {

    api.Pagesize = 10;//table 每页条数
    api.api = "zcqapi";//nginx配置的服务端ip
    api.image_default = '/common/img/no-image.jpg';
    api.filepath = api.api + '/File';

    //*************************************************服务URL*******************************************************
    api.service = {

        //用户
        Login: api.api + '/UserManageService.asmx/Login',     //登录
        LogOff: api.api + '/UserManageService.asmx/LogOff',     //注销登录
        GetAllUser: api.api + '/UserManageService.asmx/GetAllUser',     //用户列表
        GetUserInfo: api.api + '/UserManageService.asmx/GetUserInfo',     //获取用户信息
        AddorEditUser: api.api + '/UserManageService.asmx/AddorEditUser',     //添加用户信息
        DelUser: api.api + '/UserManageService.asmx/DelUser',     //删除用户
        GetRole: api.api + '/UserManageService.asmx/GetRole',     //获取用户列表

        GetMenuType: api.api + '/RecipeManageService.asmx/GetMenuType',     //获取左侧食谱类型
        GetAllRecipe: api.api + '/RecipeManageService.asmx/GetAllRecipe',     //获取食谱列表
        AddorEditRecipe: api.api + '/RecipeManageService.asmx/AddorEditRecipe',     //添加食谱
        GetRecipeInfoByID: api.api + '/RecipeManageService.asmx/GetRecipeInfoByID',     //详情
        DelRecipe: api.api + '/RecipeManageService.asmx/DelRecipe',     //删除
        GetWeekRecipe: api.api + '/RecipeManageService.asmx/GetWeekRecipe',     //获取本周食谱

        UploadAll: api.api + '/UploadManageService.asmx/UploadAll',     //文件上传
        UploadExcel: api.api + '/UploadManageService.asmx/UploadExcel',     //导入本周食谱
        



    },


    //****************************************************用户信息********************************************************
    //保存登录信息
    api.setUserLogin = function (user) {
        localStorage.setItem("userID", user.ID || '');
        localStorage.setItem("loginTime", new Date().getTime());
        localStorage.setItem("userName", user.Name || '');
        localStorage.setItem("user", JSON.stringify(user) || '{}');
    },
    //获取登录信息
     api.getUserLoginData = function () {
         var lastTime = localStorage.getItem("loginTime");
         var currentTime = new Date().getTime();
         if (!lastTime || currentTime - parseInt(lastTime) > 12 * 60 * 60 * 1000) {
             this.setUserLogout();
         }
         localStorage.setItem("loginTime", new Date().getTime());
         return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
     },
    //获取用户id
    api.getUserId = function () {
        var lastTime = localStorage.getItem("loginTime");
        var currentTime = new Date().getTime();
        if (!lastTime || currentTime - parseInt(lastTime) > 6 * 60 * 60 * 1000) {
            this.setUserLogout();
            return null;
        } else {
            localStorage.setItem("loginTime", new Date().getTime());
            return localStorage.getItem("userID");
        }

    },
    // 获取用户name
    api.getUserName = function () {
        return localStorage.getItem("userName");
    },
    //清空
    api.setUserLogout = function () {
        localStorage.clear();
        //localStorage.hasOwnProperty('name')
        //localStorage.removeItem("name");
    },



    //****************************************************获取URL地址中的特定参数****************************************
    //@param name 参数名称
    //@returns {*} 参数值，如果参数不存在，返回null
    api.getUrlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(decodeURIComponent(window.location.href));
        if (results == null) {
            return null;
        }
        else {
            return results[1] || '';
        }
    }

    return api;
}
(Server || {});