jQuery(function($) {
	$(".navigation").on("touchend",function(e){
		openNavigation($(".navigation").index(this));
	});
	initNavigationPosition();
});


var $target = $(".navList");
var $content = $(".main");

function openNavigation(num) {
	$target.css("-webkit-transform","");
	$target.eq(num).addClass("moveNavActive");
	for(var i = 0; i < $(".navigation").length; i++){
		if(i < num) {
			$target.eq(i).addClass("moveNavTop");
		}
		if(i > num) {
			$target.eq(i).addClass("moveNavBottom");
		}
	}
	$(".closeNavigation").css("display","block");
	$(".closeNavigation").on("touchend",closeNavigation);
	$target.eq(num).on("webkitTransitionEnd",function(e){
		$content.eq(num).css("display","block");
	});
}

function closeNavigation() {
	$(".closeNavigation").off("click",closeNavigation);
	$target
	.removeClass("moveNavTop")
	.removeClass("moveNavBottom")
	.removeClass("moveNavActive")
	.off("webkitTransitionEnd");
	$content.css("display","");
	$(".closeNavigation").css("display","");
	initNavigationPosition();
}

function initNavigationPosition() {
	
	for(var i = 0; i < $(".navigation").length; i++){
		$(".topNav li").eq(i).css("-webkit-transform","translateY("+ 45*i + "px)");
	}
	
}