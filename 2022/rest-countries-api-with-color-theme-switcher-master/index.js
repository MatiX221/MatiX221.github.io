async function getData ( url, region ) {
    const response = await fetch( url );
    const data = await response.json();
    const length = Object.keys( data ).length;
    const { message } = data;
    const continet = region;
    var html = "";
    if ( message == "Not Found" ) {
    } else {
        if ( continet == undefined ) {
            for ( i = 0; i < length; i++ ) {
                var { name, flag, region, population, capital, nativeName } = data[ i ]
                population = numberWithCommas( population );
                var details = "'" + name + "'"
                html += '<button class="clickable" onclick="getDetails(' + details + ')"><div class="card">';
                html += '<div class="flag">';
                html += '<div class="flag__front">'
                html += '<img src="' + flag + '"alt="flag"></div>';
                html += '<div class="flag__back"><p>Native name</p><p class="name">' + nativeName + '</div></div>';
                html += '<section class="details">';
                html += '<h2 class="oncard">' + name + '</h2>';
                html += '<div class="additional"><p class="population">';
                html += '<span class="bolder">Population: </span>' + population + '</p>';
                html += '<p class="region"><span class="bolder">Region: </span>' + region + '</p>';
                html += '<p class="capital"><span class="bolder">Capital: </span>' + capital + '</p>';
                html += '</div></section></div></button>';
            }
        }
        else {
            for ( i = 0; i < length; i++ ) {
                var { name, flag, region, population, capital, nativeName } = data[ i ]
                if ( region == continet ) {
                    population = numberWithCommas( population );
                    var details = "'" + name + "'"
                    html += '<button class="clickable" onclick="getDetails(' + details + ')"><div class="card">';
                    html += '<div class="flag">';
                    html += '<div class="flag__front">'
                    html += '<img src="' + flag + '"alt="flag"></div>';
                    html += '<div class="flag__back"><p>Native name</p><p class="name">' + nativeName + '</div></div>';
                    html += '<section class="details">';
                    html += '<h2 class="oncard">' + name + '</h2>';
                    html += '<div class="additional"><p class="population">';
                    html += '<span class="bolder">Population: </span>' + population + '</p>';
                    html += '<p class="region"><span class="bolder">Region: </span>' + region + '</p>';
                    html += '<p class="capital"><span class="bolder">Capital: </span>' + capital + '</p>';
                    html += '</div></section></div></button>';
                }
            }
        }
    }
    document.getElementsByClassName( "card__grid" )[ 0 ].innerHTML = html;
}

async function getDetails ( name ) {
    var url = "https://restcountries.com/v2/name/" + name;
    const response = await fetch( url )
    const country = await response.json();

    const grid = document.getElementsByClassName( 'container__grid' )[ 0 ];
    const details = document.getElementsByClassName( 'container__details' )[ 0 ];
    const button = document.getElementsByClassName( 'btn__back' )[ 0 ];
    const card__grid = document.getElementsByClassName( 'card__grid' )[ 0 ];
    button.removeAttribute( "disabled" );
    details.style.visibility = "unset";
    grid.style.visibility = "hidden";
    card__grid.innerHTML = '';

    var { name, flag, region, population, capital, nativeName, subregion, topLevelDomain, currencies, languages, borders } = country[ 0 ];
    var html = "";
    const lengthCurrncies = Object.keys( currencies ).length;
    var money = "";
    for ( i = 0; i < lengthCurrncies; i++ ) {
        const { code, name } = currencies[ i ];
        money += ', ' + code + ' (' + name + ')';
    }
    money = money.replace( ',', '' );

    const lengthLanguages = Object.keys( currencies ).length;
    var lang = "";
    for ( i = 0; i < lengthLanguages; i++ ) {
        const { name } = languages[ i ];
        lang += ', ' + name;
    }
    lang = lang.replace( ',', '' );

    var lengthBorders = 0;

    if ( borders == undefined ) {
        lengthBorders = 0;
    } else {
        lengthBorders = Object.keys( borders ).length;
    }

    html += '<div class="informations__details">';
    html += '<div class="informations__image"><img src="' + flag + '"></div>';
    html += '<div class="informations__text">';
    html += '<h2>' + name + '</h2>';
    html += '<div class="text__container">'
    html += '<div class="text__general">';
    html += '<p><span class="bolder">Native Name: </span>' + nativeName + '</p>';
    html += '<p><span class="bolder">Population: </span>' + population + '</p>';
    html += '<p><span class="bolder">Region: </span>' + region + '</p>';
    html += '<p><span class="bolder">Sub Region: </span>' + subregion + '</p>';
    html += '<p><span class="bolder">Capital: </span>' + capital + '</p>';
    html += '</div>';
    html += '<div class="text__additional">';
    html += '<p><span class="bolder">Top Level Domain: </span>' + topLevelDomain + '</p>';
    html += '<p><span class="bolder">Currencies: </span>' + money + '</p>';
    html += '<p><span class="bolder">Languages: </span>' + lang + '</p>';
    html += '</div><div class="text__borders"><p><span class="bolder">Borders: </span></p><br/>'
    for ( i = 0; i < lengthBorders; i++ ) {
        url = "https://restcountries.com/v2/alpha/" + borders[ i ];
        var getborders = await fetch( url );
        var bordername = await getborders.json();
        var { name } = bordername;
        request = "'" + name + "'"
        html += '<button class="btn__border" onclick="getDetails(' + request + ')">' + name + '</button>'
    }
    html += '</div></div></div></div>';
    document.getElementsByClassName( "informations" )[ 0 ].innerHTML = html;
}

function goBack () {
    const grid = document.getElementsByClassName( 'container__grid' )[ 0 ];
    const details = document.getElementsByClassName( 'container__details' )[ 0 ];
    const button = document.getElementsByClassName( 'btn__back' )[ 0 ];
    button.setAttribute( "disabled", true );
    details.style.visibility = "hidden";
    grid.style.visibility = "unset";

    const value = document.getElementsByClassName( 'search__input' )[ 0 ].value;
    const filter = document.getElementById( "filter" );
    const region = filter.value;
    if ( value == "" ) {
        if ( region == "region" ) {
            url = "https://restcountries.com/v2/all";
            getData( url );
        } else {
            url = "https://restcountries.com/v2/region/" + region;
            getData( url );
        }
    } else {
        url = "https://restcountries.com/v2/name/" + value;
        if ( region == "region" ) {
            getData( url );
        } else {
            getData( url, region )
        }
    }
}

function ChangeMode () {
    document.body.classList.toggle( "dark-mode" );
    const list = [ 'div', 'p', 'h1', 'h2', 'section', 'header', 'main', 'select', 'option', 'input', 'button' ];
    const length = list.length;

    for ( i = 0; i < length; i++ ) {
        const elements = document.getElementsByTagName( list[ i ] );
        const length = Object.keys( elements ).length;
        for ( j = 0; j < length; j++ ) {
            elements[ j ].classList.toggle( "dark-mode" );
        }
    }
    const text = document.getElementsByClassName( "btn__text" )[ 0 ];
    const image = document.getElementsByClassName( "btn__image" )[ 0 ];
    if ( text.innerHTML == "Dark mode" ) {
        text.innerHTML = "Light mode";
        localStorage.setItem( "mode", "darkMode" )
        image.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z'/></svg>";
    } else {
        text.innerHTML = "Dark mode";
        localStorage.setItem( "mode", "lightMode" )
        image.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z'/></svg>";
    }
}

function numberWithCommas ( x ) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while ( pattern.test( x ) )
        x = x.replace( pattern, "$1,$2" );
    return x;
}

$( "#filter" ).on( 'change', function () {
    const value = document.getElementsByClassName( 'search__input' )[ 0 ].value;
    const filter = document.getElementById( "filter" );
    const childrenCount = filter.childElementCount;
    const region = filter.value;
    const hidden = document.getElementById( region );
    for ( i = 0; i < childrenCount; i++ ) {
        const children = filter.children[ i ];
        children.removeAttribute( 'hidden' );
    }
    hidden.setAttribute( 'hidden', true )
    if ( value == "" ) {
        if ( region == "region" ) {
            url = "https://restcountries.com/v2/all";
            getData( url );
        } else {
            url = "https://restcountries.com/v2/region/" + region;
            getData( url );
        }
    } else {
        url = "https://restcountries.com/v2/name/" + value;
        if ( region == "region" ) {
            getData( url );
        } else {
            getData( url, region )
        }
    }
} )

$( ".search" ).on( 'change paste input', function () {
    const value = document.getElementsByClassName( 'search__input' )[ 0 ].value
    const region = document.getElementById( "filter" ).value;
    if ( value == "" ) {
        if ( region == "region" ) {
            url = "https://restcountries.com/v2/all";
            getData( url );
        } else {
            url = "https://restcountries.com/v2/region/" + region;
            getData( url )
        }
    } else {
        url = "https://restcountries.com/v2/name/" + value;
        if ( region == "region" ) {
            getData( url );
        } else {
            getData( url, region )
        }
    }
} );

var url = "https://restcountries.com/v2/all";
getData( url );

if ( localStorage.getItem( "mode" ) == "darkMode" ) {
    ChangeMode();
}