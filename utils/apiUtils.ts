import { haeElokuvaTiedotAPI } from "@/lib/tmdb_api";
import { Cast, Moviedetails } from "@/types";

export const nayttelijaListaus = (lista : Cast[]) : Cast[] => {
        
    let viidenListaus : Cast[] = [];

    for (let i = 0; i < 5; i++) {

        viidenListaus.push(lista[i]);

    }

    viidenListaus = viidenListaus.filter(n => n!==undefined);

    return viidenListaus;

}

export const kuvausTeksti = async (id : string) : Promise<string> => {

    try {

        const elokuvaData : Moviedetails = await haeElokuvaTiedotAPI(id, 'fi-FI');

        let kuvaus : string = elokuvaData.overview
    
        if (kuvaus.length == 0) {
            
            const elokuvaData : Moviedetails = await haeElokuvaTiedotAPI(id, 'en-US');
    
            kuvaus = elokuvaData.overview.toString();
            
        }

        return kuvaus;

    } catch (e : any) {

        let virhe : string;

        switch(e.message) {

            case "fetch failed" : virhe = "Palvelimelle ei saatu yhteyttä"; break;

            default : virhe = "Virheellinen data"; break;

        }

        throw new Error(virhe)

    }

}

