
var Viewport = (function(){
    var CX_WEBGL = 'webgl';
    var EX_WEBGL = 'experimental-webgl';
    var CX_2D    = '2d';
    var CX_3D    = CX_WEBGL;

    function v( args )
    {
        this._canvas  = args.canvas;
        this._context = this._canvas[0].getContext( CX_3D );
        
        if( !this._context )
        {
            this._context = this._canvas[0].getContext( EX_WEBGL );
            if( !this._context )
                throw new Error( 'WebGL is unsupported on this browser' );
        }

        // Set our default state
        // TODO: Make the background color customizable
        var cx = this._context;
        cx.clearColor( 0.34, 0.32, 0.31, 1 ); // Dark tan
        cx.clearDepth( 1 );          // Clear everything
        cx.enable( cx.DEPTH_TEST );  // No Z fighting please
        cx.depthFunc( cx.LEQUAL );
        this.clear();

        // Get and attach a default shader
        this.attachShader( Shader.getDefault() );
    }

    // Clears the viewport.
    v.prototype.clear = function(){
        var cx = this._context;
        cx.clear( cx.COLOR_BUFFER_BIT | cx.DEPTH_BUFFER_BIT );
    };

    // Attaches the given shader to the viewport
    v.prototype.attachShader = function( shaders ){
        var cx = this._context;
        var s  = cx.createProgram();
        
        // TODO: Remove old shaders here
        
        // Attach each of the shaders we're passed and then link.
        $.each( shaders, function( type, shader ){
            cx.attachShader( s, shader );
        });
        cx.linkProgram( s );

        // Did the link work?
        if( !cx.getProgramParameter( s, cx.LINK_STATUS ) )
            throw new Error( 'Failed to link shader' );

        // Link worked, lets use it
        cx.useProgram( s );
        var vertPosAttr = cx.getAttribLocation( s, 'aVertexPosition' );
        cx.enableVertexAttribArray( vertPosAttr );
    };

return v;
})(); // end Viewport

