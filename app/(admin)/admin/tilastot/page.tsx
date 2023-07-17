import TakaisinNappi from "@/components/TakaisinNappi";
import Topgenret from "@/components/Topgenret";
import Toplista from "@/components/Toplista";
import {
  haeSupabaseKayttajat,
  haeTilastot,
  haeTopElokuvat,
} from "@/lib/supabase_collection";
import { TopLista } from "@/types";
import { checkIfAdmin } from "@/utils/checkIfAdmin";
import { haeTopGenret } from "@/utils/supabaseUtils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Link from "next/link";

async function TilastotPage(): Promise<React.ReactElement> {
  const supabase = createServerComponentClient({ cookies });

  await checkIfAdmin(supabase);

  const kayttajat: PostgrestSingleResponse<any> = await haeSupabaseKayttajat(
    supabase
  );

  const tilastot: PostgrestSingleResponse<any> = await haeTilastot(supabase);

  const toplista: TopLista[] = await haeTopElokuvat(supabase);

  const top10: TopLista[] = toplista.slice(0, 10);

  const genret: JSON[] = toplista.map((lista: TopLista, idx: number) => {
    return lista.genre;
  });

  const top5Genret: string[] = haeTopGenret(genret, 5);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-3xl">Tilastot</h1>
      <h1 className="text-xl">
        Palvelulla on {kayttajat.data.length} rekisteröytynyttä ei admin
        käyttäjää
      </h1>
      <h1 className="text-xl">Sivulatauksia: {tilastot.data.sivulataukset}</h1>
      <h1 className="text-xl">
        Palveluun tehty {tilastot.data.vierailut} kirjautunutta vierailua
      </h1>
      <h1 className="text-3xl">
        Palvelun Top-10 klikatuimmat elokuvat ja Top-5 genret
      </h1>
      <div className="grid grid-cols-2">
        <div className="mr-2">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Elokuvan nimi</th>
                <th>Katselukerrat</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((toplista: TopLista, idx: number) => {
                return <Toplista key={idx} toplista={toplista} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="ml-2">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Genret</th>
              </tr>
            </thead>
            <tbody>
              {top5Genret.map((genre: string, idx: number) => {
                return <Topgenret key={idx} genret={genre} />
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Link href="/admin">
        <TakaisinNappi />
      </Link>
    </div>
  );
}

export default TilastotPage;
