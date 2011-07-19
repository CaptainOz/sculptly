<?php

// TODO: Add strict error handling
// TODO: Add error code constants
// TODO: Add file path constants
// TODO: Add cleanFilePath function

try{

    // TODO: Stick most of this in a function so other commands can call them.

    // See if the command exists
    if( !isset( $_REQUEST['command'] ) )
        throw new Exception( 'Missing command' );
    $command = 'api_'.preg_replace( '/[^\w]/', '_', strtolower( $_REQUEST['command'] ) );
    $commandFile = "commands/$command.php";
    if( !file_exists( $commandFile ) )
        throw new Exception( 'Unknown command' );

    // Load the file and call the command
    include_once( $commandFile );
    $data = $command( $_REQUEST );

    $result = array(
            // TODO: Insert result code here
            'data' => $data
        );

    header( 'Content-type: text/json' );
    echo json_encode( $result );
}
catch( Exception $e ){
    echo $e->getMessage();
    // TODO: Add error handling here.
}


