
var Entity = (function(){

    // Buffers:
    // _b : This attribute stores all the buffers.
    // v  : Vertex
    // c  : Color
    // e  : Elements

    function Entity( scene ){
        this._scene = scene;
        this._b = {};
        this._m = Matrix.I(4);
    }

    // Sets the verticies that describe the entity
    Entity.prototype.setVerticies = function( verts, elements ){
        this._verts = verts;
        this._elements = elements;
        
        var gl = this._scene._context;
        this._b.v = this._createBuffer( verts, gl.ARRAY_BUFFER );
        if( isArray( elements ) )
            this._b.e = this._createBuffer( elements, gl.ELEMENT_ARRAY_BUFFER );
    };

    // Sets the colors
    Entity.prototype.setColors = function( colors ){
        var gl = this._scene._context;
        this._colors = colors;
        this._b.c = this._createBuffer( colors, gl.ARRAY_BUFFER );
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

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this._b.e );
        scene._setMatrixUniforms();
        gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0 );

        // Pop off the transformation stack
        scene.popMatrix();
    };

    // Creates a new buffer
    Entity.prototype._createBuffer = function( data, type ){
        var gl = this._scene._context;
        var buffer = gl.createBuffer();
        gl.bindBuffer( type, buffer );
        var bdata = (type == gl.ARRAY_BUFFER)
                  ? new Float32Array( data )
                  : new Uint16Array( data );
        gl.bufferData( type, bdata, gl.STATIC_DRAW );
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
