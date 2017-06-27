$(window).ready(function() {
        searchbox();
        returntop();
        showM();
        // showinfo();
        // switchIcon();

    });
    /**
     * @return {顶部导航的搜索框}
     */
function searchbox() {
    var $searchbox = $("#searchbox");
    var $login = $("#lg-open");
    var $close = $("#click-close");

    $login.click(function() {
        $searchbox.css("display", "block")
        $searchbox.stop().animate({ width: "850px",opacity:1 }, 800)
    })
    $close.on("click", function() {
        $searchbox.stop().animate({ width: "300px",opacity:0 }, 800)
        $searchbox.fadeOut(400)
    });
};


/**
 * 返回顶部
 */

function returntop() {
    var $returntop = $("#returntop");
    $(window).scroll(function() {
        if ($(window).scrollTop() > 250) {
            $returntop.css("opacity", "1");
        } else {
            $returntop.css("opacity", "0");
        }
    });
    $returntop.click(function() {
        $('body,html').animate({ scrollTop: 0 }, 100);
        return false;
    });

};

function showM() {
    var time;
    var $menu = $(".menu-switch");
    var $subM = $(".sub-menu");
    $menu.each(function(index) {
        $menu[index].onmouseover = function() {
            $subM[index].style.display = "block"
        }
        $menu[index].onmouseout = function() {
            $subM[index].style.display = "none"

        }
    });

};
/**
 * @return 事件委托,横竖屏切换
 */
$(function() {
    var $blockIcon = $("#block-icon"); //横屏
    var $noneIcon = $("#none-icon"); //竖屏
    var $changed = $("#changed");

    //切换竖屏
    $noneIcon.on("click", function() {
        $changed.removeClass("right-menu-list").addClass("right-menu-switch");
        var $li = $(".ul-list");
    });
    //切换横屏
    $blockIcon.on("click", function() {
        $changed.removeClass("right-menu-switch").addClass("right-menu-list");
    });
    $(".container").on("mouseover", ".right-menu-list li", function() {
        //横屏移入效果
        $(this).find(".lesson-info").stop().animate({ height: "125px" }, 500);
        $(this).find(".lessonplay-pic").stop().animate({ opacity: 1 }, 100);
    }).on("mouseout", ".right-menu-list li", function() {
        //横屏移除效果
        $(this).find(".lesson-info").stop().animate({ height: "45px" }, 100);
        $(this).find(".lessonplay-pic").stop().animate({ opacity: 0 }, 100);
    }).on("mouseover", ".right-menu-switch li", function() {
        //竖屏移入效果
       $(this).find(".lessonplay-pic").stop().animate({opacity:1},100);
       $(this).find(".lessonplay").css({'background-color' : 'rgba(0,0,0,.4)'},100);
    }).on("mouseout", ".right-menu-switch li", function() {
        //竖屏移除效果
       $(this).find(".lessonplay-pic").stop().animate({opacity:0},100);
       $(this).find(".lessonplay").css({'background-color' : 'transparent '},100);
    });
});

