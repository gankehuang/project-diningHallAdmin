$(function () {
    //加载弹出层
    layui.use(['form','element'],
    function() {
        layer = layui.layer;
        element = layui.element;
    });

    //触发事件
  var tab = {
        tabAdd: function(title,url,id){
          //新增一个Tab项
          element.tabAdd('xbs_tab', {
            title: title 
            ,content: '<iframe tab-id="'+id+'" frameborder="0" src="'+url+'" scrolling="yes" class="x-iframe"></iframe>'
            ,id: id
          })
        }
        ,tabDelete: function(othis){
          //删除指定Tab项
          element.tabDelete('xbs_tab', '44'); //删除：“商品管理”
          
          
          othis.addClass('layui-btn-disabled');
        }
        ,tabChange: function(id){
          //切换到指定Tab项
          element.tabChange('xbs_tab', id); //切换到：用户管理
        }
      };


    tableCheck = {
        init:function  () {
            $(".layui-form-checkbox").click(function(event) {
                if($(this).hasClass('layui-form-checked')){
                    $(this).removeClass('layui-form-checked');
                    if($(this).hasClass('header')){
                        $(".layui-form-checkbox").removeClass('layui-form-checked');
                    }
                }else{
                    $(this).addClass('layui-form-checked');
                    if($(this).hasClass('header')){
                        $(".layui-form-checkbox").addClass('layui-form-checked');
                    }
                }
                
            });
        },
        getData:function  () {
            var obj = $(".layui-form-checked").not('.header');
            var arr=[];
            obj.each(function(index, el) {
                arr.push(obj.eq(index).attr('data-id'));
            });
            return arr;
        }
    }

    //开启表格多选
    tableCheck.init();
      

    $('.container .left_open i').click(function(event) {
        if($('.left-nav').css('left')=='0px'){
            $('.left-nav').animate({left: '-221px'}, 100);
            $('.page-content').animate({left: '0px'}, 100);
            $('.page-content-bg').hide();
        }else{
            $('.left-nav').animate({left: '0px'}, 100);
            $('.page-content').animate({left: '221px'}, 100);
            if($(window).width()<768){
                $('.page-content-bg').show();
            }
        }

    });

    $('.page-content-bg').click(function(event) {
        $('.left-nav').animate({left: '-221px'}, 100);
        $('.page-content').animate({left: '0px'}, 100);
        $(this).hide();
    });

    $('.layui-tab-close').click(function(event) {
        $('.layui-tab-title li').eq(0).find('i').remove();
    });

    //左侧菜单效果
    // $('#content').bind("click",function(event){
    $('.left-nav #nav li').click(function (event) {

        if($(this).children('.sub-menu').length){
            if($(this).hasClass('open')){
                $(this).removeClass('open');
                $(this).find('.nav_right').html('&#xe697;');
                $(this).children('.sub-menu').stop().slideUp();
                $(this).siblings().children('.sub-menu').slideUp();
            }else{
                $(this).addClass('open');
                $(this).children('a').find('.nav_right').html('&#xe6a6;');
                $(this).children('.sub-menu').stop().slideDown();
                $(this).siblings().children('.sub-menu').stop().slideUp();
                $(this).siblings().find('.nav_right').html('&#xe697;');
                $(this).siblings().removeClass('open');
            }
        }else{

            var url = $(this).children('a').attr('_href');
            var title = $(this).find('cite').html();
            var index  = $('.left-nav #nav li').index($(this));

            for (var i = 0; i <$('.x-iframe').length; i++) {
                if($('.x-iframe').eq(i).attr('tab-id')==index+1){
                    tab.tabChange(index+1);
                    event.stopPropagation();
                    return;
                }
            };
            
            tab.tabAdd(title,url,index+1);
            tab.tabChange(index+1);
        }
        
        event.stopPropagation();
         
    })
    
})

/*弹出层*/
/*
    参数解释：
    title   标题
    url     请求的url
    id      需要操作的数据id
    w       弹出层宽度（缺省调默认值）
    h       弹出层高度（缺省调默认值）
*/
function x_admin_show(title,url,w,h){
    if (title == null || title == '') {
        title=false;
    };
    if (url == null || url == '') {
        url="404.html";
    };
    if (w == null || w == '') {
        w=($(window).width()*0.9);
    };
    if (h == null || h == '') {
        h=($(window).height() - 50);
    };
    layer.open({
        type: 2,
        area: [w+'px', h +'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: true,
        shade:0.4,
        title: title,
        content: url
    });
}

/*关闭弹出框口*/
function x_admin_close(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}




    var zTree;
    var demoIframe;

    var setting = {
      view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false
      },
      data: {
        simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "pId",
          rootPId: ""
        }
      },
      callback: {
        beforeClick: function (treeId, treeNode) {
          var zTree = $.fn.zTree.getZTreeObj("tree");
          if (treeNode.isParent) {
            zTree.expandNode(treeNode);
            return false;
          } else {
            demoIframe.attr("src", treeNode.file + ".html");
            return true;
          }
        }
      }
    };

    var zNodes = [
      {id: 1, pId: 0, name: "[core] Basic Functions", open: false},
      {id: 101, pId: 1, name: "Standard JSON Data", file: "core/standardData"},
      {id: 102, pId: 1, name: "Simple JSON Data", file: "core/simpleData"},
      {id: 103, pId: 1, name: "Don't Show Line", file: "core/noline"},
      {id: 104, pId: 1, name: "Don't Show Icon", file: "core/noicon"},
      {id: 105, pId: 1, name: "Custom Icon - icon", file: "core/custom_icon"},
      {id: 106, pId: 1, name: "Custom Icon - iconSkin", file: "core/custom_iconSkin"},
      {id: 107, pId: 1, name: "Custom Fonts", file: "core/custom_font"},
      {id: 115, pId: 1, name: "Hyperlinks Demo", file: "core/url"},
      {id: 108, pId: 1, name: "Dynamic Tree with Ajax", file: "core/async"},
      {id: 109, pId: 1, name: "Dynamic Tree - zTree methods", file: "core/async_fun"},
      {id: 110, pId: 1, name: "Update Node - zTree methods", file: "core/update_fun"},
      {id: 111, pId: 1, name: "Control of Click Node", file: "core/click"},
      {id: 112, pId: 1, name: "Control of Expand Node", file: "core/expand"},
      {id: 113, pId: 1, name: "Search Nodes", file: "core/searchNodes"},
      {id: 114, pId: 1, name: "Other Mouse Events for zTree", file: "core/otherMouse"},

      {id: 2, pId: 0, name: "[excheck] Checkbox & Radio", open: false},
      {id: 201, pId: 2, name: "Checkbox Operation", file: "excheck/checkbox"},
      {id: 206, pId: 2, name: "Checkbox nocheck Demo", file: "excheck/checkbox_nocheck"},
      {id: 207, pId: 2, name: "Checkbox chkDisabled Demo", file: "excheck/checkbox_chkDisabled"},
      {id: 208, pId: 2, name: "Checkbox halfCheck Demo", file: "excheck/checkbox_halfCheck"},
      {id: 202, pId: 2, name: "Statistics Checkbox is Checked", file: "excheck/checkbox_count"},
      {id: 203, pId: 2, name: "Checkbox - zTree methods", file: "excheck/checkbox_fun"},
      {id: 204, pId: 2, name: "Radio Operation", file: "excheck/radio"},
      {id: 209, pId: 2, name: "Radio nocheck Demo", file: "excheck/radio_nocheck"},
      {id: 210, pId: 2, name: "Radio chkDisabled Demo", file: "excheck/radio_chkDisabled"},
      {id: 211, pId: 2, name: "Radio halfCheck Demo", file: "excheck/radio_halfCheck"},
      {id: 205, pId: 2, name: "Radio - zTree methods", file: "excheck/radio_fun"},

      {id: 3, pId: 0, name: "[exedit] Editing", open: false},
      {id: 301, pId: 3, name: "Normal Drag Node Operation", file: "exedit/drag"},
      {id: 302, pId: 3, name: "Advanced Drag Node Operation", file: "exedit/drag_super"},
      {id: 303, pId: 3, name: "Move / Copy - zTree methods", file: "exedit/drag_fun"},
      {id: 304, pId: 3, name: "Basic Edit Nodes", file: "exedit/edit"},
      {id: 305, pId: 3, name: "Advanced Edit Nodes", file: "exedit/edit_super"},
      {id: 306, pId: 3, name: "Edit Nodes - zTree methods", file: "exedit/edit_fun"},
      {id: 307, pId: 3, name: "Editing Dynamic Tree", file: "exedit/async_edit"},
      {id: 308, pId: 3, name: "Multiple Trees", file: "exedit/multiTree"},

      {id: 4, pId: 0, name: "Large Amount of Data Loading", open: false},
      {id: 401, pId: 4, name: "One-time Large Data Loading", file: "bigdata/common"},
      {id: 402, pId: 4, name: "Loading Data in Batches", file: "bigdata/diy_async"},
      {id: 403, pId: 4, name: "Loading Data By Pagination", file: "bigdata/page"},

      {id: 5, pId: 0, name: "Multi-functional", open: false},
      {id: 501, pId: 5, name: "Freeze the Root Node", file: "super/oneroot"},
      {id: 502, pId: 5, name: "Click to Expand Node", file: "super/oneclick"},
      {id: 503, pId: 5, name: "Keep Single Path", file: "super/singlepath"},
      {id: 516, pId: 5, name: "Fuzzy Search", file: "super/fuzzySearch"},
      {id: 504, pId: 5, name: "Adding Custom DOM", file: "super/diydom"},
      {id: 505, pId: 5, name: "Checkbox / Radio Coexistence", file: "super/checkbox_radio"},
      {id: 506, pId: 5, name: "Left Menu", file: "super/left_menu"},
      {id: 513, pId: 5, name: "OutLook Style", file: "super/left_menuForOutLook"},
      {id: 515, pId: 5, name: "Awesome Style", file: "super/awesome"},
      {id: 514, pId: 5, name: "Metro Style", file: "super/metro"},
      {id: 507, pId: 5, name: "Drop-down Menu", file: "super/select_menu"},
      {id: 509, pId: 5, name: "Drop-down Menu with checkbox", file: "super/select_menu_checkbox"},
      {id: 510, pId: 5, name: "Drop-down Menu with radio", file: "super/select_menu_radio"},
      {id: 508, pId: 5, name: "Right-click Menu", file: "super/rightClickMenu"},
      {id: 511, pId: 5, name: "Drag With Other DOMs", file: "super/dragWithOther"},
      {id: 512, pId: 5, name: "Expand All Nodes with Async", file: "super/asyncForAll"},

      {id: 6, pId: 0, name: "Other Extension Package", open: false},
      {id: 601, pId: 6, name: "hide ordinary node", file: "exhide/common"},
      {id: 602, pId: 6, name: "hide with checkbox mode", file: "exhide/checkbox"},
      {id: 603, pId: 6, name: "hide with radio mode", file: "exhide/radio"}
    ];

    $(document).ready(function () {
      var t = $("#tree");
      t = $.fn.zTree.init(t, setting, zNodes);
      demoIframe = $("#testIframe");
      demoIframe.bind("load", loadReady);
      var zTree = $.fn.zTree.getZTreeObj("tree");
      zTree.selectNode(zTree.getNodeByParam("id", 101));

    });
