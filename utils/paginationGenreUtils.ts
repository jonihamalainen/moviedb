export const paginationGenreUtils  = (genre : string) : string  => {

    let fixedGenre : string = genre.toLowerCase();

    if (genre == "Jännitys") {

        fixedGenre = "jannitys";

    } else if (genre == "Elämänkerta" ) {

        fixedGenre = "elamankerta"

    } else if (genre == "Sci-Fi") {

        fixedGenre = "scifi"

    } else if (genre == "Film-Noir"){
        
        fixedGenre = "filmnoir"

    }

    return fixedGenre;

}

