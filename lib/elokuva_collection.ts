import { MongoClient, Collection, ObjectId } from "mongodb";

const client: MongoClient = new MongoClient(process.env.DB_URI!);

export interface Elokuva {
  _id: ObjectId;
  alkuperainennimi: string;
  genre: Array<string>;
  imdbid: string;
  imdburl: string;
  kestomin: number;
  nimi: string;
  ohjaaja: Array<string>;
  tmdbid: number;
  tmdbkuva: string;
  tuotantomaa: Array<string>;
  valmistumisvuosi: number;
}

export const haeElokuvat = async (): Promise<any> => {
  try {
    await client.connect();

    const elokuvalista: Collection<Elokuva> = client
      .db("Elokuvat")
      .collection("elokuva_collection");

    return elokuvalista.find({}).limit(40).sort({ _id: -1 }).toArray();
  } catch (e: any) {
    let virhe: string;

    switch (e.message) {
      case "fetch failed":
        virhe = "Palvelimelle ei saatu yhteyttä";
        break;

      case "bad auth : authentication failed":
        virhe = "Virheellinen tietokantayhteys";
        break;

      default:
        virhe = "Virheellinen data";
        break;
    }

    throw new Error(virhe);
  }
};

export const haeElokuva = async (id: string): Promise<any> => {
  try {
    await client.connect();

    const elokuvalista: Collection<Elokuva> = client
      .db("Elokuvat")
      .collection("elokuva_collection");

    return elokuvalista.findOne({ _id: new ObjectId(id) });
  } catch (e: any) {
    let virhe: string;

    switch (e.message) {
      case "fetch failed":
        virhe = "Palvelimelle ei saatu yhteyttä";
        break;

      case "bad auth : authentication failed":
        virhe = "Virheellinen tietokantayhteys";
        break;

      default:
        virhe = "Virheellinen data";
        break;
    }

    throw new Error(virhe);
  }
};

export const haeGenre = async (genrehaku: string): Promise<any> => {
  try {
    await client.connect();

    const elokuvalista: Collection<Elokuva> = client
      .db("Elokuvat")
      .collection("elokuva_collection");

    return elokuvalista
      .find({ genre: genrehaku })
      .limit(40)
      .sort({ _id: -1 })
      .toArray();
  } catch (e: any) {
    let virhe: string;

    switch (e.message) {
      case "fetch failed":
        virhe = "Palvelimelle ei saatu yhteyttä";
        break;

      case "bad auth : authentication failed":
        virhe = "Virheellinen tietokantayhteys";
        break;

      default:
        virhe = "Virheellinen data";
        break;
    }

    throw new Error(virhe);
  }
};
