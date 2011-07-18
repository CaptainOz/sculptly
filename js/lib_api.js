
var api = (function(){
    var API_URI = C.URI+'/api.php';

    function api( command, data )
    {
        // Update the data object with the parameters.
        var success = data.success;
        var async   = true;
        delete data.success;
        data.command = command;

        $.ajax( API_URI, {
            type    : 'POST',
            data    : data,
            success : function(result){ api_success( result, success ); }
        });
    }

    function api_success( data, callback )
    {
        // TODO: Add profiling info.
        // TODO: Add error checking/handling.
        callback( data );
    }

return api;
})(); // end api construction

