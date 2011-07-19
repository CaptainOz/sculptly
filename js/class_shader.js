
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
    s.prototype.attach = function( gl ){
        this._context = gl;
        var prog = gl.createProgram();
        $.each( this._shaders, function( type, source ){

            // TODO: Remove old shaders here

            // Create the shader
            var shader = null;
            if( type == 'fragment' )
                shader = gl.createShader( gl.FRAGMENT_SHADER );
            else if( type == 'vertex' )
                shader = gl.createShader( gl.VERTEX_SHADER );
            else
                throw new Error( 'Unknown shader type: '+type );
            gl.shaderSource( shader, source );
            gl.compileShader( shader );

            // Did the shader create correctly?
            if( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) )
                throw new Error( 'Failed to compile shader: '
                                +gl.getShaderInfoLog( shader ) );

            // Attach the shader to the program.
            gl.attachShader( prog, shader );
        });

        // All shaders created and attached, link 'em up!
        gl.linkProgram( prog );
        if( !gl.getProgramParameter( prog, gl.LINK_STATUS ) )
            throw new Error( 'Failed to link shader' );

        // Link up, lets use it
        gl.useProgram( prog );
        this._program = prog;

        // Enable the vertex attributes
        var vertPosAttr = this.getAttrLoc( 'aVertexPosition' );
        gl.enableVertexAttribArray( vertPosAttr );
        var vertColAttr = this.getAttrLoc( 'aVertexColor' );
        gl.enableVertexAttribArray( vertColAttr );
    };

    // Gets the shader program
    s.prototype.getProgram = function(){
        return this._program;
    };

    s.prototype.getAttrLoc = function( name ){
        return this._context.getAttribLocation( this._program, name );
    };

return s;
})(); // end Shader class

