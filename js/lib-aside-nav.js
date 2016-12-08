/**
 * Created by Administrator on 2016/12/1 0001.
 */
$(function () {
    var libAsideNav = myLibAsideNav(),
        $parentEle = $(".lib-aside-nav"),
        $mainChildEle = $(".lib-aside-nav-item-main");

    (function (parent,child) {
        libAsideNav.init(parent,child);
    })($parentEle,$mainChildEle);

    $(document).on("click",".in-fold h3",function () {
        var $curEle = $(this);
        libAsideNav.unfold($curEle,$parentEle,$(".in-unfold"));
    }).on("click",".in-unfold h3",function () {
        var $curEle = $(this);
        libAsideNav.fold($curEle,$parentEle,$(".in-fold"));
    })

    $(window).resize(function(){
        libAsideNav.adjust($parentEle,$(".in-unfold"));
    });
})

var myLibAsideNav = function(){
    return{
        nav:3,
        componentH:32,
        foldNum:2,
        init :function (parent,child) {
            var $objH = parent.height();
            child.height($objH - this.nav*this.componentH);
        },
        adjust:function (parent,child) {
            var $objH = parent.height();
            var $childH = ($objH - this.nav*this.componentH)/(this.nav-this.foldNum);
            child.height($childH);
        },
        fold:function (obj,parent) {
            if(!$(".lib-aside-add-menu").is(":hidden")){
                $(".lib-aside-add-menu").fadeOut();
            }
            obj.parent().removeClass("in-unfold").addClass("in-fold").height(0);
            this.foldNum++;
            this.adjust(parent,$(".in-unfold"));
        },
        unfold:function (obj,parent) {
            if(!$(".lib-aside-add-menu").is(":hidden")){
                $(".lib-aside-add-menu").fadeOut();
            }
            obj.parent().removeClass("in-fold").addClass("in-unfold");
            this.foldNum--;
            this.adjust(parent,$(".in-unfold"));
        }
    }
}
