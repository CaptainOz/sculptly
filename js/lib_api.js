
var api = (function(){
    var API_URI = C.URI+'/api';

    function api( command, data )
    {
        var success = data.success;
        delete data.success;
        $.ajax( API_URI, {
            data    : data
            success : function(result){ api_success( result, success ); }
        });
    }

    function api_success( data, callback )
    {
        // TODO: Add profiling info.
        callback( data );
    }

return api;
})(); // end api construction

