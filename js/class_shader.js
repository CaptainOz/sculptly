
// TODO: Document Shader class
var Shader = (function(){
    function s( args )
    {
        this._shaders = $.extend( {}, args );
        this._program = null;
    }
    
    // Fetches the default shaders.
    s.getDefault = function(callback){
        var shader = null;
        api( 'GetShader', {
            name    : 'Default'
        },{
            async   : isFunction( callback ),
            success : function(data){
                if( isFunction(callback) )
                    callback( new s( data ) );
                else
                    shader = new s( data );
            }
        });
        return shader;
    };

    // Attaches the shaders to the given context
    s.prototype.attach = function( cx ){
        var prog = cx.createProgram();
        $.each( this._shaders, function( type, source ){

            // TODO: Remove old shaders here

            // Create the shader
            var shader = null;
            if( type == 'fragment' )
                shader = cx.createShader( cx.FRAGMENT_SHADER );
            else if( type == 'vertex' )
                shader = cx.createShader( cx.VERTEX_SHADER );
            else
                throw new Error( 'Unknown shader type: '+type );
            cx.shaderSource( shader, source );
            cx.compileShader( shader );

            // Did the shader create correctly?
            if( !cx.getShaderParameter( shader, cx.COMPILE_STATUS ) )
                throw new Error( 'Failed to compile shader: '
                                +cx.getShaderInfoLog( shader ) );

            // Attach the shader to the program.
            cx.attachShader( prog, shader );
        });

        // All shaders created and attached, link 'em up!
        cx.linkProgram( prog );
        if( !cx.getProgramParameter( prog, cx.LINK_STATUS ) )
            throw new Error( 'Failed to link shader' );

        // Link up, lets use it
        cx.useProgram( prog );
        var vertPosAttr = cx.getAttribLocation( prog, 'aVertexPosition' );
        cx.enableVertexAttribArray( vertPosAttr );
        this._program = prog;
    };

    // Gets the shader program
    s.prototype.getProgram = function(){
        return this._program;
    };

return s;
})(); // end Shader class

