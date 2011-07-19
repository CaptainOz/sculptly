
var Entity = (function(){

    // Buffers:
    // _b : This attribute stores all the buffers.
    // v  : Vertex
    // c  : Color

    function Entity( scene ){
        this._scene = scene;
        this._b = {};
        this._m = Matrix.I(4);
    }

    // Sets the verticies that describe the entity
    Entity.prototype.setVerticies = function( verts ){
        this._verts = verts;
        this._b.v = this._createBuffer( verts );
    };

    // Sets the colors
    Entity.prototype.setColors = function( colors ){
        this._colors = colors;
        this._b.c = this._createBuffer( colors );
    };

    // Draws the entity
    Entity.prototype.draw = function(){
        var scene  = this._scene;
        var gl     = scene._context;
        var shader = scene._shader;

        // Push on a new matrix and apply our transformations
        scene.pushMatrix();
        scene.applyTransformations( this._m );

        // Draw our verticies.
        var vertPosAttr = shader.getAttrLoc( 'aVertexPosition' );
        gl.bindBuffer( gl.ARRAY_BUFFER, this._b.v );
        gl.vertexAttribPointer( vertPosAttr, 3, gl.FLOAT, false, 0, 0 );
        var vertColAttr = shader.getAttrLoc( 'aVertexColor' );
        gl.bindBuffer( gl.ARRAY_BUFFER, this._b.c );
        gl.vertexAttribPointer( vertColAttr, 4, gl.FLOAT, false, 0, 0 );

        scene._setMatrixUniforms();
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

        // Pop off the transformation stack
        scene.popMatrix();
    };

    // Creates a new buffer
    Entity.prototype._createBuffer = function( data ){
        var gl = this._scene._context;
        var buffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array( data ),
            gl.STATIC_DRAW
        );
        return buffer;
    };

    // Rotates the entity
    Entity.prototype.rotate = function( d, x, y, z ){
        var rad = d * Math.PI / 180.0;
        var rot = Matrix.Rotation( rad, $V([x,y,z]) ).ensure4x4();
        this._m = this._m.x( rot );
    };

return Entity;
})(); // end Entity
