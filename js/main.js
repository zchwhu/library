/**
 * Created by Administrator on 2016/11/30 0030.
 */
$(function () {
    var $isCollapse = false;
    $(document).on("click",".lib-nav-sub",function () {
        if($(".lib-nav-sub-menu").is(":hidden")){
            $(this).children("a").addClass("active");
            $(".lib-nav-sub-menu").show();
        }else{
            $(this).children("a").removeClass("active");
            $(".lib-nav-sub-menu").hide();
        }
    }).on("click",".lib-aside-right-handle",function () {
        if(!$isCollapse){
            $(".lib-main").css("right",0);
            $(".lib-aside-right").css("right",-336+'px');
            $isCollapse = true;
        }else{
            $(".lib-main").css("right",336+'px');
            $(".lib-aside-right").css("right",0);
            $isCollapse = false;
        }
    }).on("click",".action-sort",function () {
        if($(".action-sort-menu").is(":hidden")){
            $(".action-sort-menu").fadeIn();
        }else {
            $(".action-sort-menu").fadeOut();
        }
    }).on("click",".lib-aside-add-btn",function () {
        if($(".lib-aside-add-menu").is(":hidden")){
            $(".lib-aside-add-menu").fadeIn();
        }else{
            $(".lib-aside-add-menu").fadeOut();
        }
    }).on("click",".select-all",function () {
        if(!$(this).hasClass("selected")){
            $(this).addClass("selected");
            $(".lib-doc-item").addClass("selected").find("input[type='checkbox']").prop("checked",true);
            if(!$(".action-toolbar").hasClass("active")){
                $(".action-toolbar").addClass("active");
            }
        }else{
            $(this).removeClass("selected");
            $(".lib-doc-item").removeClass("selected").find("input[type='checkbox']").prop("checked",false);
            if($(".action-toolbar").hasClass("active")){
                $(".action-toolbar").removeClass("active");
            }
        }
    }).on("click",".select-one input[type='checkbox']",function (e) {
        var $docNum = $(".lib-doc-item").length;
        if($(this).is(":checked")){
            $(this).parents(".lib-doc-item").addClass("selected");
            if(!$(".action-toolbar").hasClass("active")){
                $(".action-toolbar").addClass("active");
            }
            if($(".lib-doc-item.selected").length==$docNum){
                $(".select-all").addClass("selected");
            }
            e.stopPropagation();
        }else {
            $(this).parents(".lib-doc-item").removeClass("selected");
            e.stopPropagation();
            if($(".select-all").hasClass("selected")){
                $(".select-all").removeClass("selected");
            }
            if($(".lib-doc-item.selected").length==0){
                if($(".action-toolbar").hasClass("active")){
                    $(".action-toolbar").removeClass("active");
                }
            }
        }
    }).on("click",".lib-doc-item",function () {
        if(!$(".select-all").hasClass("selected")){
            if(!$(this).hasClass("selected")){
                $(this).addClass("selected")
                    .find("input[type='checkbox']").prop("checked",true);
                $(this).siblings().removeClass("selected").find("input[type='checkbox']").prop("checked",false);
                if(!$(".action-toolbar").hasClass("active")){
                    $(".action-toolbar").addClass("active");
                }
            }else{
                $(this).removeClass("selected")
                    .find("input[type='checkbox']").prop("checked",false);
                if($(".action-toolbar").hasClass("active")){
                    $(".action-toolbar").removeClass("active");
                }
            }
        }else{
            $(this).siblings().removeClass("selected").find("input[type='checkbox']").prop("checked",false);
            $(".select-all").removeClass("selected");
        }
    }).on("click",".mark-favor",function (e) {
        if(!$(this).hasClass("selected")){
            $(this).addClass("selected").attr("title","取消收藏");
            e.stopPropagation();
        }else{
            $(this).removeClass("selected").attr("title","收藏");
            e.stopPropagation();
        }
    }).on("click",".mark-unread",function (e) {
        if(!$(this).hasClass("selected")){
            $(this).addClass("selected").attr("title","标为已读");
            e.stopPropagation();
        }else{
            $(this).removeClass("selected").attr("title","标为未读");
            e.stopPropagation();
        }
    }).on("click",".lib-aside-tab span",function () {
        $(this).addClass("active").siblings().removeClass("active");
        if($(this).hasClass("tab-notes")){
            $(".lib-doc-note").css("left",0);
            $(".lib-doc-detail").css("left",-336+"px");
        }else{
            $(".lib-doc-detail").css("left",0);
            $(".lib-doc-note").css("left",336+"px");
            if($(".lib-doc-view").is(":hidden")){
                $(".lib-doc-edit").fadeOut(300,function () {
                    $(".lib-doc-view").fadeIn();
                });
            }
        }
    }).on("click",".doc-abs-more",function (e) {
        e.preventDefault();
        $(this).hide().next(".doc-abs-less").removeClass("hide");
        $(".doc-abs").addClass("doc-abs-expanded").removeClass("doc-abs-expand");
    }).on("click",".doc-abs-less",function (e) {
        e.preventDefault();
        $(this).addClass("hide").prev(".doc-abs-more").show();
        $(".doc-abs").addClass("doc-abs-expand").removeClass("doc-abs-expanded");
    }).on("click",".doc-file-del",function () {
        if(confirm("您确认删除这个文件吗？")){
            $(this).parents(".doc-file-item").remove();
            if($(".doc-file-item").length==0){
                $(".doc-file h2").hide();
            }
        }
    }).on("change",".doc-file input[type='file']",function () {
        if($(".doc-file h2").is(":hidden")){
            $(".doc-file h2").show();
        }
        var $fileName = $(this).val();
        $(".doc-file-list").append($("<li class='doc-file-item'><i class='icon icon-action icon-remove doc-file-del'></i><a class='doc-file-name' href=''>"+$fileName+"</a></li>"));
        $(this).val('');
    }).on("click",".url-add-btn",function (e) {
        if(!firstisEmpty($(this))){
            e.preventDefault();
            $("<div class='doc-url'><input name='urls' type='text'><i class='icon icon-action icon-remove url-remove'></i></div>").insertBefore($(this));
        }else{
            $(this).prev().find("input").focus();
        }

        function firstisEmpty(obj) {
            return obj.prev().find("input").val().length==0;
        }
    }).on("click",".url-remove",function () {
        if($(".doc-url").length>1){
            $(this).parents(".doc-url").remove();
        }
    }).on("click",".tag-remove",function () {
        $(this).parents(".doc-tag")
                .css({"width":0,"padding-left":0,"padding-right":0,"border":0});
    }).on("transitionend",".doc-tag",function () {
        $(this).remove();
    }).on("keydown",".doc-tag-input input",function (e) {
        var key = e.keyCode;
        switch (key){
            case 8:{
                if($(this).val()==''){
                    $(this).parent().prev(".doc-tag").css({"width":0,"padding-left":0,"padding-right":0,"border":0});
                }
                break;
            }
            case 13:{
                e.preventDefault();
                e.stopPropagation();
                if($(this).val()!==''){
                    var tagText = $(this).val();
                    $("<li class='doc-tag'><span>"+tagText+"</span><i class='icon icon-action icon-remove tag-remove'></i></li>").insertBefore($(".doc-tag-input"));
                }
                break;
            }
        }
    }).on("click",".lib-edit-btn",function () {
        $(".lib-doc-view").fadeOut(300,function () {
            $(".lib-doc-edit").fadeIn();
        });
    }).on("click",".lib-cancel-btn",function () {
        $(".lib-doc-edit").fadeOut(300,function () {
            $(".lib-doc-view").fadeIn();
        });
    }).on("click",".note-empty-btn",function () {
        $(".doc-note-area textarea").val("");
    })
})