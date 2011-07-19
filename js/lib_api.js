
var api = (function(){
    var API_URI = C.URI+'/api.php';

    function api( command, data, options )
    {
        if( !isObject( options ) )
            options = {};
        data.command = command;

        slog( options );

        $.ajax( API_URI, {
            type    : 'POST',
            data    : data,
            async   : exists(options.async) ? Boolean(options.async) : true,
            context : options,
            success : api_success
        });
    }

    function api_success( result )
    {
        // TODO: Add profiling info.
        // TODO: Add error checking/handling.
        slog( result );
        this.success( result.data );
    }

return api;
})(); // end api construction

