
// TODO: Document Viewport class
var Viewport = (function(){
    var gl_WEBGL = 'webgl';
    var EX_WEBGL = 'experimental-webgl';
    var gl_2D    = '2d';
    var gl_3D    = gl_WEBGL;

    // Matrixes:
    // _m : This attribute stores all the matrices.
    // t  : Translation
    // p  : Perspective
    // r  : Rotation
    // s  : Scale

    function v( args )
    {
        // Initialize some of our member data
        this._canvas  = args.canvas;
        this._context = this._canvas[0].getContext( gl_3D );
        this._m = {};

        if( !this._context )
        {
            this._context = this._canvas[0].getContext( EX_WEBGL );
            if( !this._context )
                throw new Error( 'WebGL is unsupported on this browser' );
        }

        // Set our default state
        // TODO: Make the background color customizable
        var gl = this._context;
        gl.clearColor( 0.34, 0.32, 0.31, 1 ); // Dark tan
        gl.clearDepth( 1 );          // Clear everything
        gl.enable( gl.DEPTH_TEST );  // No Z fighting please
        gl.depthFunc( gl.LEQUAL );
        this.clear();

        // Get and attach a default shader
        this.attachShader( Shader.getDefault() );

        // Update the size information about the viewport and initialize our
        // draw buffers.
        this.resize();
        this._initBuffers();
    }

    // Clears the viewport.
    v.prototype.clear = function(){
        var gl = this._context;
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    };

    // Attaches the given shader to the viewport
    v.prototype.attachShader = function( shader ){
        this._shader = shader;
        shader.attach( this._context );
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
            hAspect : height / width,
            vAspect : width / height
        };
    };

    // Initializes the draw buffer (private)
    v.prototype._initBuffers = function(){
        // Initialize the vertex buffer
        var gl = this._context;

        this.e = new Entity( this );
        this.e.setVerticies([
        //   x    y    z
            1.0, 1.0, 0.0,
           -1.0, 1.0, 0.0,
            1.0,-1.0, 0.0,
           -1.0,-1.0, 0.0
        ]);
        this.e.setColors([
        //   r    g    b    a
            1.0, 1.0, 1.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ]);
    };

    // Draws our current vertex buffer
    v.prototype.draw = function(){
        // Clear the context
        var gl = this._context;
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        // Reset the perspective matrix
        this._m.p = makePerspective( 45, this._size.vAspect, 0.1, 100 );
        this.resetTranslate();
        this.translate( 0.0, 0.0, -6.0 );

        this.e.draw();

        this._setMatrixUniforms();
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    };

    // Resets the translation matrix
    v.prototype.resetTranslate = function(){
        this._m.t = Matrix.I(4);
    };

    // Translates the scene by the given amounts
    v.prototype.translate = function( x, y, z ){
        var translation = Matrix.Translation($V([x, y, z])).ensure4x4();
        this._m.t = this._m.t.x( translation );
    };

    v.prototype._setMatrixUniforms = function(){
        // Get the shader program and uniform locations
        var gl   = this._context;
        var prog = this._shader.getProgram();
        var pUni = gl.getUniformLocation( prog, 'uPMatrix' );
        var mUni = gl.getUniformLocation( prog, 'uMVMatrix' );

        // Set the uniform matrices.
        gl.uniformMatrix4fv( pUni, false, this._m.p.toF32Array() );
        gl.uniformMatrix4fv( mUni, false, this._m.t.toF32Array() );
    };


    // --- Helper Functions --- //


    // gluLookAt
    function makeLookAt(ex, ey, ez,
                        gl, cy, cz,
                        ux, uy, uz)
    {
        var eye = $V([ex, ey, ez]);
        var center = $V([gl, cy, cz]);
        var up = $V([ux, uy, uz]);

        var mag;

        var z = eye.subtract(center).toUnitVector();
        var x = up.cross(z).toUnitVector();
        var y = z.cross(x).toUnitVector();

        var m = $M([
            [x.e(1), x.e(2), x.e(3), 0],
            [y.e(1), y.e(2), y.e(3), 0],
            [z.e(1), z.e(2), z.e(3), 0],
            [0, 0, 0, 1]
        ]);

        var t = $M([
            [1, 0, 0, -ex],
            [0, 1, 0, -ey],
            [0, 0, 1, -ez],
            [0, 0, 0, 1]
        ]);
        return m.x(t);
    }

    // glOrtho
    function makeOrtho(left, right,
                       bottom, top,
                       znear, zfar)
    {
        var tx = -(right+left)/(right-left);
        var ty = -(top+bottom)/(top-bottom);
        var tz = -(zfar+znear)/(zfar-znear);

        return $M([
            [2/(right-left), 0, 0,  tx],
            [0, 2/(top-bottom), 0,  ty],
            [0, 0, -2/(zfar-znear), tz],
            [0, 0, 0, 1]
        ]);
    }

    // gluPerspective
    function makePerspective(fovy, aspect, znear, zfar)
    {
        var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
    }

    // glFrustum
    function makeFrustum(left, right,
                         bottom, top,
                         znear, zfar)
    {
        var X = 2*znear/(right-left);
        var Y = 2*znear/(top-bottom);
        var A = (right+left)/(right-left);
        var B = (top+bottom)/(top-bottom);
        var C = -(zfar+znear)/(zfar-znear);
        var D = -2*zfar*znear/(zfar-znear);

        return $M([
            [X, 0, A, 0],
            [0, Y, B, 0],
            [0, 0, C, D],
            [0, 0, -1, 0]
        ]);
    }

    // glOrtho
    function makeOrtho(left, right, bottom, top, znear, zfar)
    {
        var tx = - (right + left) / (right - left);
        var ty = - (top + bottom) / (top - bottom);
        var tz = - (zfar + znear) / (zfar - znear);

        return $M([
            [2 / (right - left), 0, 0,  tx],
            [0, 2 / (top - bottom), 0,  ty],
            [0, 0, -2 / (zfar - znear), tz],
            [0, 0, 0, 1]
        ]);
    }


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

return v;
})(); // end Viewport

