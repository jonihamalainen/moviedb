import Elokuvalistaus from "@/components/Elokuvalistaus";
import Paginationbtn from "@/components/Paginationbtn";
import { Elokuva, haeGenre } from "@/lib/elokuva_collection";
import { genreCheck } from "@/utils/genreCheck";
import { paginationUtils } from "@/utils/paginationUtils";

interface Props {
  params: {
    genre: string;
    sivu: string;
  };
}

export default async function GenrePage({
  params,
}: Props): Promise<React.ReactElement> {
  const haku = genreCheck(params.genre);

  const elokuvat: Elokuva[] = await haeGenre(haku);

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
        <h2 className="text-4xl py-2">Ei elokuvia</h2>
      )}
    </>
  );
}
