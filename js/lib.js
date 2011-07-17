
// Global constants
var C = {};
C.PROTOCOL = 'http://';
C.DOMAIN   = 'api.evecms.net';
C.URI      = '/sculptly';
C.URL      = C.PROTOCOL + C.DOMAIN + C.URI;


// Handy type checking functions
function exists( o )
{
    var a;
    return a !== o;
}
function isFunction( o )
{
    return o instanceof Function || typeof o == 'function';
}

// Safe logging function
function slog( message )
{
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


