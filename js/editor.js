
var editor = {};
$(function(){

try{

    // Is canvas supported?
    if( !isFunction( $('canvas')[0].getContext ) )
        throw new Error( 'Canvas is unsupported on this browser' );

    editor.viewports = [];
    $('canvas.viewport').each(function(){
        editor.viewports.push( new Viewport({
            canvas : $(this)
        }));
    });

    setInterval( function(){
            editor.viewports[0].draw();
        }, 33 );

}
catch( e ){
    slog( e );
    // TODO: Add some sort of error banner.
}

}); // end editor on ready


