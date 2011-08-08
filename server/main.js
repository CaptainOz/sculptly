
try{

    var web = require('sculptlyWeb');
    web.start();
}
catch( e ){
    console.log( '*** Server FAILED ***' );
    throw e;
}

