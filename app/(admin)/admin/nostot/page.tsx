import Hallitsenostoja from "@/components/Hallitsenostoja";
import Lisaanosto from "@/components/Lisaanosto";
import TakaisinNappi from "@/components/TakaisinNappi";
import { haeKaikkiElokuvat } from "@/lib/elokuva_collection";
import { ElokuvaNostoTiedot } from "@/types";
import { checkIfAdmin } from "@/utils/checkIfAdmin";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

async function NostotPage(): Promise<React.ReactElement> {
  const supabase = createServerComponentClient({ cookies });

  await checkIfAdmin(supabase);

  const ElokuvatSimple: ElokuvaNostoTiedot[] = JSON.parse(
    JSON.stringify(await haeKaikkiElokuvat())
  );

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-3xl">Muokkaa etusivun nostettuja listoja</h1>
      <Lisaanosto elokuvat={ElokuvatSimple} />
      <Hallitsenostoja/>
      <Link href="/admin">
        <TakaisinNappi />
      </Link>
    </div>
  );
}

export default NostotPage;
