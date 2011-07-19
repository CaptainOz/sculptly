
var Entity = (function(){

    // Buffers:
    // _b : This attribute stores all the buffers.
    // v  : Vertex
    // c  : Color

    function Entity( scene ){
        this._scene = scene;
        this._b = {};
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
        var gl = this._scene._context;
        var shader = this._scene._shader;

        // Draw our verticies.
        var vertPosAttr = shader.getAttrLoc( 'aVertexPosition' );
        gl.bindBuffer( gl.ARRAY_BUFFER, this._b.v );
        gl.vertexAttribPointer( vertPosAttr, 3, gl.FLOAT, false, 0, 0 );
        var vertColAttr = shader.getAttrLoc( 'aVertexColor' );
        gl.bindBuffer( gl.ARRAY_BUFFER, this._b.c );
        gl.vertexAttribPointer( vertColAttr, 4, gl.FLOAT, false, 0, 0 );
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

return Entity;
})(); // end Entity
