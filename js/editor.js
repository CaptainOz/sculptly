
var editor = {};
$(function(){
    // Is canvas supported?
    if( !isFunction( $('canvas')[0].getContext ) )
    {
        $('#content').html( '<a>', {
            href : 'http://www.google.com/chrome',
            text : 'Please upgrade your browser.'
        });
        return {};
    }

    // Set up the viewport contexts
    editor.$viewports = $('canvas.viewport');
    editor.contexts = [];
    editor.$viewports.each(function(){
            // TODO: Add viewport type checking support (i.e. orthagonal,
            //       perspective, 3d, 2d)
            editor.contexts.push( this.getContext( '2d' ) );
        });

    var ctx = editor.contexts[0];
    ctx.fillStyle = 'rgb( 200, 0, 0 )';
    ctx.fillRect( 10, 10, 55, 50 );
    
    ctx.fillStyle = 'rgba( 0, 0, 200, 0.5 )';
    ctx.fillRect( 30, 30, 55, 50 );

}); // end editor on ready


