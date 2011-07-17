
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
        cx.clearColor( 0, 0, 0, 1 ); // black
        cx.clearDepth( 1 );          // Clear everything
        cx.enable( cx.DEPTH_TEST );  // No Z fighting please
        cx.depthFunc( cx.LEQUAL );
        this.clear();
    }
    
    v.prototype.clear = function(){
        var cx = this._context;
        cx.clear( cx.COLOR_BUFFER_BIT | cx.DEPTH_BUFFER_BIT );
    };

    

return v;
})(); // end Viewport

