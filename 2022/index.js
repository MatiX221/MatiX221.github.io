async function data () {

    const response = await fetch( '../data.json' );
    const data = await response.json();
    const lenght = Object.keys( data ).length;

    for ( i = 0; i < lenght; i++ ) {
        const { name } = data[ i ];
        if ( name == "2022" ) {
            const { children } = data[ i ];
            const lenght = Object.keys( children ).length;
            for ( j = 0; j < lenght; j++ ) {
                const { name } = children[ j ];
                const pages = ( children[ j ] );
                if ( name == "pages" ) {
                    const { children } = pages;
                    const lenght = Object.keys( children ).length;
                    var html = '<div class="card__grid">'
                    for ( k = 0; k < lenght; k++ ) {
                        const page = children[ k ];
                        var header = page.name;
                        html += '<a href="./pages/' + header + '/">';
                        html += '<div class="card">';
                        html += '<div class="image">';
                        html += '<img class="img" src="./pages/' + header + '/design/desktop-design.jpg" alt="' + header + '"></div>';
                        html += '<section class="details">';
                        html += '<h1 class="header">' + header.replaceAll( "-", " " ) + '</h1>';
                        html += '</section></div></a>'
                    }
                    html += '</div>'
                    $( ".container" ).append( html );
                }
            }
        }
    }
}

function card () {
    $( ".container > div" ).remove();
    $.ajax( {
        url: "../data.json",
        success: function ( result ) {
            $.each( result, function ( index, item ) {
                // var header = item.userId; //this should be in div class = "card-header"
                // var image = item.id; //this should be in div class = "card-header"

                // var html = '<div class="card">';
                // html += '<div class="image"><img class="img" src=" ' + userId + " typeId: " + typeId + "</div>";
                // html += '<div class="card-body">';
                // html += '<h5 class="card-title">' + titleId + "</h5>";
                // html += '<p class="card-text">' + bodyId + "</p>";


                //use loop below here and inject to div.container
                // $( ".container" ).append( html );
            } );
            // console.log('success', result);
            // console.log(result[0].body);
            // console.log($(result).length);
        },
    } );
};

card();
data();