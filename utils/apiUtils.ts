import { haeElokuvaTiedotAPI } from "@/lib/tmdb_api";
import { Cast, Moviedetails } from "@/types";

export const nayttelijaListaus = (lista: Cast[]): Cast[] | string[] => {
  if (!lista) {
    return ["Ei näyttelijöitä"];
  } else {
    let viidenListaus: Cast[] = [];

    for (let i = 0; i < 5; i++) {
      viidenListaus.push(lista[i]);
    }

    viidenListaus = viidenListaus.filter((n) => n !== undefined);

    return viidenListaus;
  }
};

export const kuvausTeksti = async (id: string): Promise<string> => {
  const elokuvaData: Moviedetails = await haeElokuvaTiedotAPI(id, "fi-FI");

  let kuvaus: string = "";

  if (elokuvaData.title === undefined) {
    kuvaus = "Ei kuvausta";
    return kuvaus;
  } else {
    if (kuvaus.length == 0) {
      const elokuvaData: Moviedetails = await haeElokuvaTiedotAPI(id, "en-US");

      kuvaus = elokuvaData.overview.toString();
    }
    return kuvaus;
  }
};
