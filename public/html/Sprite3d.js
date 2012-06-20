enchant.Sprite3d =  enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height) {
        enchant.Entity.call(this);
        this.width = width;
        this.height = height;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._dirty = false;
        this._image = null;
        this._frame = 0;
        this._rotationX = 0;
        this._rotationY = 0;
        this._rotationZ = 0;
		this._transformorigin = "50% 50%";
        this._style.overflow = 'hidden';

        this.addEventListener('render', function() {
            if (this._dirty) {
            	this._style[VENDER_PREFIX + 'TransformOrigin'] = this._transformorigin;
            	if("webkit" == VENDER_PREFIX){
	                this._style[VENDER_PREFIX + 'Transform'] = [
	                    'rotate(', this._rotation, 'deg)',
	                    'rotateX(', this._rotationX, 'deg)',
	                    'rotateY(', this._rotationY, 'deg)',
	                    'rotateZ(', this._rotationZ, 'deg)',
	                    'scale(', this._scaleX, ',', this._scaleY, ')'
	                ].join('');
                }else{
       	                this._style[VENDER_PREFIX + 'Transform'] = [
	                    'rotate(', this._rotation, 'deg)',
	                    'scale(', this._scaleX, ',', this._scaleY, ')'
	                ].join('');         
                }
                this._dirty = false;
            }
        });
    },
    rotateX:function(deg){
    	this._rotationX += deg;
        this._dirty = true;
    },
    rotateY:function(deg){
    	this._rotationY += deg;
        this._dirty = true;
    },
    rotateZ:function(deg){
    	this._rotationZ += deg;
        this._dirty = true;
    },
    TransformOrigin:function(x,y){
    	if(x==null){x="50%"}
   		if(y==null){y=x;}
   		this._transformorigin = x + " " + y;
   		this._dirty = true;
    },
    rotate2: function(deg) {
        this._rotation = Math.abs((this._rotation + deg+360)%360);
        this._dirty = true;
    }
});



var VENDER_PREFIX = (function() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Opera') != -1) {
        return 'O';
    } else if (ua.indexOf('MSIE') != -1) {
        return 'ms';
    } else if (ua.indexOf('WebKit') != -1) {
        return 'webkit';
    } else if (navigator.product == 'Gecko') {
        return 'Moz';
    } else {
        return '';
    }
})();