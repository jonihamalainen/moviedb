import Elokuvalistaus from "@/components/Elokuvalistaus";
import Paginationbtn from "@/components/Paginationbtn";
import { Elokuva, haeGenre } from "@/lib/elokuva_collection";
import { lisaaSivuLataus } from "@/lib/supabase_collection";
import { genreCheck } from "@/utils/genreCheck";
import { paginationUtils } from "@/utils/paginationUtils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Props {
  params: {
    genre: string;
    sivu: string;
  };
}

export default async function GenrePage({
  params,
}: Props): Promise<React.ReactElement> {

  const supabase = createServerComponentClient({cookies})

  await lisaaSivuLataus(supabase);

  const haku = genreCheck(params.genre);

  const elokuvat: Elokuva[] = JSON.parse(
    JSON.stringify(await haeGenre(haku))
  );

  // 0 = totalPages 1 = Slice start 2 = Slice end
  const paginationHelpers: number[] = paginationUtils(elokuvat, params.sivu);

  return (
    <>
      <h2 className="text-4xl py-2">{haku} elokuvat</h2>

      {Number(params.sivu) <= paginationHelpers[0] ? (
        <>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
            {elokuvat
              .slice(paginationHelpers[1], paginationHelpers[2])
              .map((elokuva: Elokuva, idx: number) => {
                return <Elokuvalistaus elokuva={elokuva} />;
              })}
          </div>
          <Paginationbtn
            currentPage={Number(params.sivu)}
            totalPages={paginationHelpers[0]}
            genre={haku}
          />
        </>
      ) : (
        <div>
          <h2 className="text-4xl py-2">Ei elokuvia</h2>
        </div>
      )}
    </>
  );
}
