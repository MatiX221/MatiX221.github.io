async function data () {

    const response = await fetch( '../data.json' );
    const data = await response.json();
    const lenght = Object.keys( data ).length;

    for ( i = 0; i < lenght; i++ ) {
        const { name } = data[ i ];
        if ( name == "2022" ) {
            const { children } = data[ i ];
            const lenght = Object.keys( children ).length;
            var num = 0;
            for ( j = 0; j < lenght; j++ ) {
                const { type } = children[ j ];
                if ( type == "folder" ) {
                    num += 1;
                }
            }
            var html = '<div class="card__grid">'
            for ( k = 0; k < lenght; k++ ) {
                const { type } = children[ k ];
                if ( type == "folder" ) {
                    const pages = ( children[ k ] );
                    var header = pages.name;
                    html += '<a href="./' + header + '/">';
                    html += '<div class="card">';
                    html += '<div class="image">';
                    html += '<img class="img" src="./' + header + '/design/desktop-preview.jpg" alt="' + header + '"></div>';
                    html += '<section class="details">';
                    html += '<h1 class="header">' + header.replaceAll( "-", " " ) + '</h1>';
                    html += '</section></div></a>'
                }
            }
            html += '</div>'
        }
        $( ".container" ).append( html );
    }
}

data();