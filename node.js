var DirectoryStructureJSON = require( 'directory-structure-json' );
var basepath = './';
var fs = require( 'fs' ); // you can select any filesystem as long as it implements the same functions that native fs uses.

DirectoryStructureJSON.getStructure( fs, basepath, function ( err, structure, total ) {
    if ( err ) console.log( err );

    console.log( 'there are a total of: ', total.folders, ' folders and ', total.files, ' files' );
    console.log( 'the structure looks like: ', JSON.stringify( structure, null, 4 ) );

    fs.writeFile( 'data.json', JSON.stringify( structure, null, 4 ), ( err ) => {
        if ( err ) { throw err }
    } )
} );