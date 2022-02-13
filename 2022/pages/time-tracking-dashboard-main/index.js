async function daily () {
    const response = await fetch( './data.json' );
    const data = await response.json();

    for ( i = 0; i <= 5; i++ ) {
        const { title, timeframes: { daily } } = data[ i ];
        const str = title.replace( /\s/g, '' );
        if ( daily.current == 1 ) {
            var hours = "hr";
        } else {
            var hours = "hrs";
        }
        document.getElementById( "now--" + str.toLowerCase() ).innerHTML = daily.current + hours;
        if ( daily.previous == 1 ) {
            var hours = "hr";
        } else {
            var hours = "hrs";
        }
        document.getElementById( "last--" + str.toLowerCase() ).innerHTML = "Last day - " + daily.previous + hours;
        document.getElementById( "daily" ).style.cssText = 'color: white';
        document.getElementById( "weekly" ).style.cssText = 'color: $clr-desaturated-blue';
        document.getElementById( "monthly" ).style.cssText = 'color: $clr-desaturated-blue';
    }
}

async function weekly () {
    const response = await fetch( './data.json' );
    const data = await response.json();

    for ( i = 0; i <= 5; i++ ) {
        const { title, timeframes: { weekly } } = data[ i ];
        const str = title.replace( /\s/g, '' );
        if ( weekly.current == 1 ) {
            var hours = "hr";
        } else {
            var hours = "hrs";
        }
        document.getElementById( "now--" + str.toLowerCase() ).innerHTML = weekly.current + hours;
        if ( weekly.previous == 1 ) {
            var hours = "hr";
        } else {
            var hours = "hrs";
        }
        document.getElementById( "last--" + str.toLowerCase() ).innerHTML = "Last week - " + weekly.previous + hours;
        document.getElementById( "daily" ).style.cssText = 'color: $clr-desaturated-blue';
        document.getElementById( "weekly" ).style.cssText = 'color: white';
        document.getElementById( "monthly" ).style.cssText = 'color: $clr-desaturated-blue';
    }
}

async function monthly () {
    const response = await fetch( './data.json' );
    const data = await response.json();

    for ( i = 0; i <= 5; i++ ) {
        const { title, timeframes: { monthly } } = data[ i ];
        const str = title.replace( /\s/g, '' );
        if ( monthly.current == 1 ) {
            var hours = "hr";
        } else {
            var hours = "hrs";
        }
        document.getElementById( "now--" + str.toLowerCase() ).innerHTML = monthly.current + hours;
        if ( monthly.previous == 1 ) {
            var hours = "hr";
        } else {
            var hours = "hrs";
        }
        document.getElementById( "last--" + str.toLowerCase() ).innerHTML = "Last month - " + monthly.previous + hours;
        document.getElementById( "daily" ).style.cssText = 'color: $clr-desaturated-blue';
        document.getElementById( "weekly" ).style.cssText = 'color: $clr-desaturated-blue';
        document.getElementById( "monthly" ).style.cssText = 'color: white';
    }
}

weekly();
