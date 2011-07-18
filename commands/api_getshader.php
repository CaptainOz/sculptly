<?php

function api_getshader( $request )
{
    // TODO: Add verifyString function
    if( !isset( $request['name'] ) || !is_string( $request['name'] ) )
        throw new Exception( 'Missing "name" parameter' );
    
    // Open the shader directory
    $name = preg_replace( '/[^\w]/', '_', strtolower( $request['name'] ) );
    $dirName = "shaders/$name/";
    if( !is_dir( $dirName ) )
        throw new Exception( 'Unknown shader: '.$name );
    $shaderDir = opendir( $dirName );

    // Read in all of the shaders.
    $shaders = array();
    while( ($filename = readdir( $shaderDir )) !== false ){
        if( !preg_match( '/(\w+)\.shader$/', $filename, $matches ) )
            continue;
        $shaders[ $matches[1] ] = file_get_contents( $dirName.$filename );
    }
    closedir( $shaderDir );
    
    // Done!
    return $shaders;
}

