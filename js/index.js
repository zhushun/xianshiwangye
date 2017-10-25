/*
 * Created by Administrator on 2017/10/13.
 */

//轮播函数
(function () {
    var $banner=$("#banner"),
        $part=$(".part"),
        $li=$(".b-d-ul li"),
        length=$part.length,
        index=0,
        timer=null;

    $li.eq(0).addClass("li-on");
    $part.eq(0).fadeIn(1000);
    auto();
    function auto() {
        timer=setInterval(function () {
            chang(function () {
                    index++;
                    index %=length
                })
        },2000)
    }
    $banner.hover(function () {
        clearInterval(timer);
    },auto);
    $li.click(function () {
        chang(function () {
           return index=$(this).index();
        }.bind(this));
    });
    function chang(fn) {
        $li.eq(index).removeClass("li-on");
        $part.eq(index).fadeOut(1000);
        fn && fn();
        $li.eq(index).addClass("li-on");
        $part.eq(index).fadeIn(1000);
    }
})();

//手机轮播滚动函数
(function(){
    var $ul=$(".c-p-img ul"),
        $li=$(".c-p-n-dot").find("li"),
        // liwidth=$li.width(),
        $btn=$(".bt-g"),
        moveTo;
        index=4;
//给中间三个添加类名
    function addname(index){
        var $li=$ul.children();
        if (document.body.clientWidth < 600) {
            return;
        }
        $li.removeClass("li-side li-center");
        $li.eq(index-1).addClass("li-side");
        $li.eq(index).addClass("li-center");
        $li.eq(index+1).addClass("li-side");
    }
//改变圆点函数
    function changDot(moveTo){
        if(moveTo){
            index--;
            if(index<0){index=8}
            console.log(index);
            $li.eq(index).addClass("n-dot-li23").siblings().removeClass("n-dot-li23");
        }else{
            index++;
            index%=9;
            console.log(index);
            $li.eq(index).addClass("n-dot-li23").siblings().removeClass("n-dot-li23");
        }
    }
//css3的代码执行完后执行的代码
    function transformend(){
        console.log(moveTo);
        console.log(111);
        $ul.css({
            transform:"",
            transitionDuration:"0s"
        });
        moveTo?$ul.prepend($ul.children().last()):$ul.append($ul.children().first());
        /*
         if(moveTo){
         $ul.prepend($ul.children().last());
         }else {
         $ul.append($ul.children().first());
         }
        */
        changDot(moveTo);
        $ul[0].removeEventListener("webkitTransitionEnd",transformend)
    }
//实现move函数
    function move(e){
        var liwidth=(document.body.clientWidth < 600)?180:$(".li-side").width();
        // if (document.body.clientWidth < 600) {
        //     var liwidth=180;
        // }else {
        //     var liwidth=$(".li-side").width();
        // }

        moveTo=e.data.moveTo;
        console.log(liwidth);
        $ul[0].style.transitionDuration="0.5s";
        $ul[0].style.transform=moveTo?"translateX("+liwidth+"px)":"translateX(-"+liwidth+"px)";
        addname(moveTo?3:5);
        $ul[0].addEventListener("webkitTransitionEnd",transformend);
        /*
         if(moveTo){
         $ul.css({
         transform:"translateX("+liwidth+"px)",
         transitionDuration:"0.5s"
         });
         addname(3);
         $ul[0].addEventListener("webkitTransitionEnd",transformend);
         // $ul[0].addEventListener("transitionEnd",transformend(lor));
         }else{
         $ul.css({
         transform:"translateX(-"+liwidth+"px)",
         transitionDuration:"0.5s"
         });
         addname(5);
         $ul[0].addEventListener("webkitTransitionEnd",transformend);
         // $ul[0].addEventListener("transitionEnd",transformend(lor));
         }
        */


    }

//点击左右移动
//     $btn.eq(0).on("click",{lor:true},move());
//     $btn.eq(1).on("click",{lor:false},move());
       $btn.eq(0).off("click").click({moveTo:true},move);
       $btn.eq(1).off("click").click({moveTo:false},move);

})();