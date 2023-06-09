import { Elokuva, haeElokuva } from "@/lib/elokuva_collection"
import {timeConvert} from "@/utils/timeConvert";
import { haeNayttelijatAPI } from "@/lib/tmdb_api";
import { kuvausTeksti, nayttelijaListaus } from "@/utils/apiUtils";
import { Cast, Credits } from "@/types";
import Elokuvatiedot from "@/components/Elokuvatiedot";

interface Props {
    params : {
        id : string
    }
}

export default async function ElokuvaPage({params} : Props) {

    const elokuva : Elokuva = await haeElokuva(params.id);

    const apiData : Credits = await haeNayttelijatAPI(elokuva.tmdbid.toString());

    const elokuvaKuvaus : string = await kuvausTeksti(elokuva.tmdbid.toString());

    const nayttelijaLista : Cast[] = nayttelijaListaus(apiData.cast);

    const listapituus : number = nayttelijaLista.length;

    const kesto : string = timeConvert(elokuva.kestomin);

    return(
        <>
        
            <Elokuvatiedot elokuva={elokuva} elokuvaKuvaus={elokuvaKuvaus} listapituus={listapituus} kesto={kesto} nayttelijaLista={nayttelijaLista}/>
                
        </>

    )
}