export const genreCheck  = (genre : string) : string  => {

    let haku : string = genre.charAt(0).toUpperCase() + genre.slice(1);

    if (genre == "jannitys") {

        haku = "Jännitys";

    } else if (genre == "elamankerta") {

        haku = "Elämänkerta"

    } else if (genre == "scifi") {

        haku = "Sci-Fi"

    } else if (genre == "filmnoir"){
        
        haku = "Film-Noir"

    }

    return haku;

}

