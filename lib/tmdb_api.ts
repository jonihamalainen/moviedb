import { Credits, Moviedetails } from "@/types";

const url: string = process.env.API_URI!;

export const haeNayttelijatAPI = async (id: string): Promise<Credits> => {
  try {
    const yhteys = await fetch(
      `${url}movie/${id}/credits?api_key=${process.env.API_KEY!}`
    );

    return await yhteys.json();
  } catch (e: any) {
    let virhe: string;

    switch (e.message) {
      case "fetch failed":
        virhe = "Palvelimelle ei saatu yhteyttä";
        break;

      default:
        virhe = "Virheellinen data";
        break;
    }

    throw new Error(virhe);
  }
};

export const haeElokuvaTiedotAPI = async (
  id: string,
  hakukieli: string
): Promise<Moviedetails> => {
  try {
    const yhteys = await fetch(
      `${url}movie/${id}?api_key=${process.env.API_KEY!}&language=${hakukieli}`
    );
    return await yhteys.json();
  } catch (e: any) {
    let virhe: string;

    switch (e.message) {
      case "fetch failed":
        virhe = "Palvelimelle ei saatu yhteyttä";
        break;

      default:
        virhe = "Virheellinen data";
        break;
    }

    throw new Error(virhe);
  }
};
