jQuery(function($) {
	var w = window.innerWidth;    
    var h = window.innerHeight;
    var slideXOld = 0;
    var slideYOld = 0;
    var i = 0;
    var points = []; //ドラッグ時のマウスの座標を集める
	var $canvas; //追加されたキャンバスを格納
	var canvasWidth;
	var canvasHeight;
	var aw = 10;
	var dragFlag = false;

    $('body').css({'width': w,'height': h});
    
    
    
    
   
	$('#fieldWrap').bind({
		'touchstart': function(e) {
			 if( dragFlag == false ){
				 this.touchX = event.changedTouches[0].pageX;
				 this.touchY = event.changedTouches[0].pageY;
			}
    	},
    	/* フリック中 */
    	'touchmove': function(e) {
    		if( dragFlag == false ){
    			e.preventDefault();
    			this.slideX =  slideXOld + this.touchX - event.changedTouches[0].pageX;
    			this.slideY =  slideYOld + this.touchY - event.changedTouches[0].pageY;
    			$("#field").css("-webkit-transform", "rotateX("+ this.slideY + "deg) rotateY("+ this.slideX + "deg)");
    		}
    	},
    	/* フリック終了 */
    	'touchend': function(e) {
    		if( dragFlag == false ){
    			slideXOld = this.slideX;
    			slideYOld = this.slideY;
    		}
    	}
   });
   
   $('.myCreature').bind({
		'touchstart': function(e) {
			dragFlag = true;
			$canvas = addCanvas();
			points = [{x:event.changedTouches[0].pageX, y:event.changedTouches[0].pageY}];
    	},
    	'touchmove': function(e) {
			e.preventDefault();
			var ctx = $canvas.get(0).getContext('2d');
		    points.push({x:event.changedTouches[0].pageX, y:event.changedTouches[0].pageY});
		
		    var array = getRectPoints(
		    	points[0].x,
		    	points[0].y,
		    	points[points.length - 1].x,
		    	points[points.length - 1].y
		    );
		    ctx.fillStyle = "rgba(250,0,0,0.7)";
		    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		    ctx.beginPath();
		    ctx.moveTo(array[0].x, array[0].y);
		    ctx.lineTo(array[1].x, array[1].y);
		    ctx.lineTo(array[2].x, array[2].y);
		    ctx.lineTo(array[3].x, array[3].y);
		    ctx.lineTo(array[4].x, array[4].y);
		    ctx.lineTo(array[5].x, array[5].y);
		    ctx.lineTo(array[6].x, array[6].y);
		    ctx.closePath();
		    ctx.fill();
			isHoverTarget(event);
		},
		'touchend': function(e) { 
			var myCreatureId = $(this).attr("id");
			$canvas.remove();
			points = [];
			dragFlag = false;
			isSelectTarget(event, myCreatureId);
		}
	});

	function getRectPoints(ptax, ptay, ptbx, ptby) {
		var Vx= ptbx - ptax;
		var Vy= ptby - ptay;
		var v = Math.sqrt(Vx*Vx+Vy*Vy);
		var Ux= Vx/v;
		var Uy= Vy/v;
		var w = 20;
		var h = v/3;
		var array = [];

		array.push({x:ptax + Uy*aw, y:ptay  - Ux*aw});
		array.push({x:ptbx + Uy*aw - Ux* h, y:ptby - Ux*aw - Uy* h});
		array.push({x:ptbx + Uy* w  - Ux* h, y:ptby - Ux* w  - Uy* h});
		array.push({x:ptbx, y:ptby});
		array.push({x:ptbx - Uy* w  - Ux* h, y:ptby + Ux* w  - Uy* h});
		array.push({x: ptbx  - Uy*aw - Ux* h, y:ptby + Ux*aw - Uy* h});
		array.push({x:ptax - Uy*aw, y:ptay  + Ux*aw});

		return array;
	}

	function addCanvas(){
		return $('<canvas width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>').appendTo('#wrap');
	}
	canvasWidth = $('#wrap').width();
	canvasHeight = $('#wrap').height();
	
	 //ターゲットに照準が当たっているかの判別
	function isHoverTarget(e) {
			// ターゲットが敵クリーチャーの場合
			for (i = 1;i <= $(".targetCreature").length; i++){
				var t = i + $(".targetCreature").length;
				var obj = new creature("#field" + t);
				if (e.changedTouches[0].pageX > obj.x() && e.changedTouches[0].pageX < obj.x() + 40  && e.changedTouches[0].pageY > obj.y() && e.changedTouches[0].pageY < obj.y() + 40) {
					$("#field" + t).addClass("selectObj");
				}
				else {
					$("#field" + t).removeClass("selectObj");
				}
			}
	}
	 //ターゲットを選択したかの判別
	function isSelectTarget(e, name) {
		// ターゲットが敵クリーチャーの場合
		for (i = 1;i <= $(".targetCreature").length; i++){
			var t = i + $(".targetCreature").length;
			var obj = new creature("#field" + t);
			if (e.changedTouches[0].pageX > obj.x() && e.changedTouches[0].pageX < obj.x() + 40  && e.changedTouches[0].pageY > obj.y() && e.changedTouches[0].pageY < obj.y() + 40) {
				
				$("#field" + t).removeClass("selectObj");
				$("#"+name).css("-webkit-transform","translate3d("+ (obj.fieldX() - 45) +"px,"+obj.fieldY()+"px,"+obj.fieldZ()+"px)");
				//alert("ドゴォ!"+ name + "からの攻撃で" + $("#field" + t).attr("id") + "は死んだ");
			}
		}
	}
	//ここからクリーチャーの情報
	function creature(id) {
		this.x = function() {
			return $(id).offset().left;
		};

		this.y = function() {
			return $(id).offset().top;
		};
		this.fieldX = function() {
			m = new WebKitCSSMatrix($(id).css('-webkit-transform'));
			return m.m41;
		};

		this.fieldY = function() {
			m = new WebKitCSSMatrix($(id).css('-webkit-transform'));
			return m.m42;
		};
		
		this.fieldZ = function() {
			m = new WebKitCSSMatrix($(id).css('-webkit-transform'));
			return m.m43;
		};
		/*
		var off = $(id).offset();
		alert(off.left);
		var m = new WebKitCSSMatrix($(id).css('-webkit-transform'));
		var obj = {x:off.left, y:off.top, dx:m.m41, dy:m.m42, dz:m.m43};
		return obj;
		*/
	}
});