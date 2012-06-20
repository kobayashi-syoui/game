enchant();

window.onload = function() {
	var w = window.innerWidth;    
    var h = window.innerHeight;
    var i = 0;
	var game = new Game(w, h);
	game.fps = 24;
	game.preload('card/monster/kani.jpg');
	
	game.onload = function() {
		var fieldWrap = new Group();
		var field = new Sprite3d(500, 500);
		var card = new Sprite3d(640, 640);
		card.image = game.assets['card/monster/kani.jpg'];
		field.backgroundColor = '#ffffff';
		field._element.setAttribute('class','fieldStyle');
		game.rootScene.addChild(fieldWrap);
		fieldWrap.addChild(field);
		fieldWrap.addChild(card);
		fieldWrap.moveBy(70,120);
		card.scale(0.1,0.1);
		field.rotateX(70);
		field.rotateZ(30);
		field.moveTo(30,120);
	};
	
	game.start();

};