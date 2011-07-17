

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




