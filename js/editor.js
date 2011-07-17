
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

    $('canvas.viewport').drawRect({
        fillStyle : 'rgb( 200, 0, 0 )',
        x : 10, y : 10,
        width  : 55,
        height : 50,
        fromCenter : false
    }).drawRect({
        fillStyle : 'rgba( 0, 0, 200, 0.5 )',
        x : 30, y : 30,
        width  : 55,
        height : 50,
        fromCenter : false
    });

}); // end editor on ready


