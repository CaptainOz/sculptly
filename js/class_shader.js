
// TODO: Document Shader class
var Shader = (function(){
    function s( args )
    {
        $.extend( this, args );
    }
    
    // Fetches the default shaders.
    s.getDefault = function(callback){
        api( 'GetShader', {
            name    : 'Default',
            success : function(data){
                callback( new s( data ) );
            }
        });
    };

return s;
})(); // end Shader class

