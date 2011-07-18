
// TODO: Document Viewport class
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
        Shader.getDefault( this.attachShader.bind(this) );

        // Update the size information about the viewport and initialize our
        // draw buffers.
        this.resize();
        this._initBuffers();
        this.draw();
    }

    // Clears the viewport.
    v.prototype.clear = function(){
        var cx = this._context;
        cx.clear( cx.COLOR_BUFFER_BIT | cx.DEPTH_BUFFER_BIT );
    };

    // Attaches the given shader to the viewport
    v.prototype.attachShader = function( shaders ){
        shaders.attach( this._context );
    };

    // Handles resizing the render area.
    v.prototype.resize = function( width, height ){
        if( isNumber( width ) && isNumber( height ) ){
            // TODO: Resize the canvas here
        }
        else {
            width =  this._canvas.width();
            height = this._canvas.height();
        }

        // Update our size cache
        this._size = {
            width  : width,
            height : height,
            aspect : height / width
        };
    };

    // Initializes the draw buffer (private)
    v.prototype._initBuffers = function(){
        // Initialize the buffer
        var cx = this._context;
        this._vertBuffer = cx.createBuffer();
        cx.bindBuffer( cx.ARRAY_BUFFER, this._vertBuffer );

        // Create our verticies
        var verts = [
            1.0, 1.0, 0.0,
           -1.0, 1.0, 0.0,
            1.0,-1.0, 0.0,
           -1.0,-1.0, 0.0
        ];
        cx.bufferData(
            cx.ARRAY_BUFFER,
            new Float32Array( verts ),
            cx.STATIC_DRAW
        );
    };

    // 

return v;
})(); // end Viewport

