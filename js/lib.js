
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


