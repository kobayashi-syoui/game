enchant();

window.onload = function() {
	var w = window.innerWidth;    
    var h = window.innerHeight;
    var i = 0;
	var game = new Game(w, h);
	game.fps = 24;
	game.preload('card/monster/kani.jpg');
	game.preload('test.svg');
	
	game.onload = function() {
		var fieldWrap = new Group();
		var field = new Sprite3d(500, 500);
		var card = new Sprite3d(640, 640);
		card.image = game.assets['test.jpg'];
		field.backgroundColor = '#ffffff';
		field._element.setAttribute('class','fieldStyle');
		game.rootScene.addChild(fieldWrap);
		//game.rootScene.addChild(field);
		fieldWrap.addChild(card);
		card.scale(0.1,0.1);
		field.rotateX(80);
	};
	
	game.start();

};