import Kayttajalista from "@/components/Kayttajalista";
import TakaisinNappi from "@/components/TakaisinNappi";
import { haeSupabaseKayttajat } from "@/lib/supabase_collection";
import { checkIfAdmin } from "@/utils/checkIfAdmin";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

async function KayttajahallintaPage(): Promise<React.ReactElement> {
  const supabase = createServerComponentClient({ cookies });

  await checkIfAdmin(supabase);

  const kayttajat = await haeSupabaseKayttajat(supabase);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-3xl">Käyttäjähallinta</h1>
      {kayttajat.data.length === 0 ? (
        <h1>Ei poistettavia käyttäjiä</h1>
      ) : (
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Sähköposti</th>
              <th>Luotu</th>
              <th>Viimeisin kirjautuminen</th>
            </tr>
          </thead>
          <tbody>
            {kayttajat.data.map((kayttaja: any, idx: number) => {
              return <Kayttajalista kayttaja={kayttaja} />;
            })}
          </tbody>
        </table>
      )}
      <Link href="/admin">
            <TakaisinNappi/>
      </Link>
    </div>
  );
}

export default KayttajahallintaPage;
