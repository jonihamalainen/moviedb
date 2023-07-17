import { Elokuva } from "@/lib/elokuva_collection";
import { ElokuvaLisays } from "@/types";
import { Collection, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const client: MongoClient = new MongoClient(process.env.DB_URI!);

export default async function elokuva(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const elokuva: ElokuvaLisays = req.body;

      await client.connect();

      const elokuvalista: Collection<ElokuvaLisays> = client
        .db("Elokuvat")
        .collection("elokuva_collection");

      const result = await elokuvalista.insertOne(elokuva);

      res.status(200).json({ message: "Document inserted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error inserting document" });
    }
  } else if (req.method === "GET") {
    try {
      await client.connect();

      const elokuvalista: Collection<Elokuva> = client
        .db("Elokuvat")
        .collection("elokuva_collection");

      const id = req.query.id as string;

      const result = await elokuvalista.findOne({ _id: new ObjectId(id) });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error getting document" });
    }
  } else if (req.method === "PUT") {
    try {
      await client.connect();

      const elokuva: Elokuva = req.body;

      const elokuvalista: Collection<Elokuva> = client
        .db("Elokuvat")
        .collection("elokuva_collection");

      const id = req.query.id as string;

      const muokattuElokuva: Elokuva = {
        _id: new ObjectId(elokuva._id),
        alkuperainennimi: elokuva.alkuperainennimi,
        genre: elokuva.genre,
        imdbid: elokuva.imdbid,
        imdburl: elokuva.imdburl,
        kestomin: elokuva.kestomin,
        nimi: elokuva.nimi,
        ohjaaja: elokuva.ohjaaja,
        tmdbid: elokuva.tmdbid,
        tmdbkuva: elokuva.tmdbkuva,
        tuotantomaa: elokuva.tuotantomaa,
        valmistumisvuosi: elokuva.valmistumisvuosi,
      };

      const result = await elokuvalista.findOneAndReplace(
        { _id: new ObjectId(id) },
        muokattuElokuva
      );

      console.log("elokuva._id:", elokuva._id);
      console.log("result:", result);

      res.status(200).json({ message: "Document inserted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error inserting document" });
    }
  } else if (req.method === "DELETE") {
    try {
      await client.connect();

      const elokuvalista: Collection<Elokuva> = client
        .db("Elokuvat")
        .collection("elokuva_collection");

      const id = req.query.id as string;

      const result = await elokuvalista.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting document" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
