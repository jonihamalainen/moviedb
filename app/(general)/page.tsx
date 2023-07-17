import Elokuvalistaus from "@/components/Elokuvalistaus";
import Karuselli from "@/components/Karuselli";
import Nosto from "@/components/Nosto";
import { Elokuva, haeElokuvat, haeNostoListaElokuvat } from "@/lib/elokuva_collection";
import { haeJulkaistutListat, lisaaSivuLataus } from "@/lib/supabase_collection";
import { NostoLista } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function HomePage(): Promise<React.ReactElement> {

  const supabase = createServerComponentClient({ cookies });

  await lisaaSivuLataus(supabase);

  const elokuvat: Elokuva[] = JSON.parse(
    JSON.stringify(await haeElokuvat())
  );;

  const listat: NostoLista[] = await haeJulkaistutListat(supabase);

  const elokuvatPromises = listat.map(async (lista: NostoLista, idx: number) => {
    const elokuvatArray: string[] = Object.values(lista.elokuvat);
    const elokuvat: Elokuva[] = await haeNostoListaElokuvat(elokuvatArray);
    return { lista, nostoelokuvat: elokuvat };
  });
  const resolvedElokuvat = await Promise.all(elokuvatPromises);

  return (
    <>
      <h1 className="text-4xl py-2">Esittelyssä</h1>

      <Karuselli />

      {resolvedElokuvat.map(({ lista, nostoelokuvat }) => (
        <Nosto lista={lista} nostoelokuvat={nostoelokuvat} key={lista.id} />
      ))}

      <h1 className="text-4xl py-2">Uusimmat elokuvat</h1>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
        {elokuvat.map((elokuva: Elokuva, idx: number) => (
          <Elokuvalistaus elokuva={elokuva} key={idx} />
        ))}
      </div>
    </>
  );
}