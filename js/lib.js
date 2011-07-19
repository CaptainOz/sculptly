
// Global constants
var C = {};
C.PROTOCOL = 'http://';
C.DOMAIN   = 'api.evecms.net';
C.URI      = '/sculptly';
C.URL      = C.PROTOCOL + C.DOMAIN + C.URI;

// Handy type checking functions
function exists( o ){
    var a;
    return Boolean(a !== o && o !== null);
}
function isFunction( o ){
    return Boolean(o instanceof Function || typeof o == 'function');
}
function isNumber( o ){
    return Boolean(o instanceof Number || !isNaN( o ));
}
function isObject( o ){
    return Boolean(typeof o == 'object' && !(o instanceof Array));
}
function isBoolean( o ){
    return Boolean(o instanceof Boolean || typeof o == 'boolean');
}
function isArray( o ){
    return Boolean(o instanceof Array);
}

// Safe logging function
function slog( message ){
    if( exists( window.console ) && isFunction( console.log ) )
        console.log( message );
}

// Cross browser compatability
if( !exists( Function.prototype.bind ) )
    Function.prototype.bind = function( obj ){
        var args = arguments.slice( 1 );
        var bound = function(){
            return self.apply( obj, args );
        };
        bound.prototype = this.prototype;
        return bound;
    };


// --- Sylvester augmentation --- //


Matrix.Translation = function( v ){
    // 2 x 2
    if( v.elements.length == 2 ){
        var r = Matrix.I(3);
        r.elements[2][0] = v.elements[0];
        r.elements[2][1] = v.elements[1];
        return r;
    }

    // 3 x 3
    else if( v.elements.length == 3 ){
        var r = Matrix.I(4);
        r.elements[0][3] = v.elements[0];
        r.elements[1][3] = v.elements[1];
        r.elements[2][3] = v.elements[2];
        return r;
    }

    // Error x Error
    else
        throw new Error('Invalid length for Translation');
};

Matrix.prototype.flatten = function(){
    var result = [];
    if( this.elements.length == 0 )
        return [];

    for( var j = 0; j < this.elements[0].length; j++ )
        for( var i = 0; i < this.elements.length; i++ )
            result.push( this.elements[i][j] );
    return result;
};

Matrix.prototype.ensure4x4 = function(){
    // Already a 4x4? Return.
    if (this.elements.length    == 4 &&
        this.elements[0].length == 4)
        return this;

    // Greater than 4x4? Can't fix it!
    if (this.elements.length > 4 ||
        this.elements[0].length > 4)
        return null;

    // Less than 4 wide? Pad out the columns
    for( var i = 0; i < this.elements.length; i++ ){
        for( var j = this.elements[i].length; j < 4; j++ ){
            if( i == j )
                this.elements[i].push(1);
            else
                this.elements[i].push(0);
        }
    }

    // Less than for high? Pad extra rows
    for(var i = this.elements.length; i < 4; i++ ){
        if( i == 0 )
            this.elements.push([1, 0, 0, 0]);
        else if( i == 1 )
            this.elements.push([0, 1, 0, 0]);
        else if( i == 2 )
            this.elements.push([0, 0, 1, 0]);
        else if( i == 3 )
            this.elements.push([0, 0, 0, 1]);
    }

    // We good.
    return this;
};

Matrix.prototype.make3x3 = function(){
    if( this.elements.length    != 4 ||
        this.elements[0].length != 4 )
        return null;

    return Matrix.create([
        [this.elements[0][0], this.elements[0][1], this.elements[0][2]],
        [this.elements[1][0], this.elements[1][1], this.elements[1][2]],
        [this.elements[2][0], this.elements[2][1], this.elements[2][2]]
    ]);
};

Matrix.prototype.toF32Array = function(){
    return new Float32Array( this.flatten() );
};

Vector.prototype.flatten = function(){
    return this.elements;
};


