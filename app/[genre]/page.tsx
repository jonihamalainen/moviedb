import Elokuvalistaus from "@/components/Elokuvalistaus";
import { Elokuva, haeGenre } from "@/lib/elokuva_collection";
import { genreCheck } from "@/utils/genreCheck";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    genre: string;
  };
}

export default async function GenrePage({
  params,
}: Props): Promise<React.ReactElement> {
  const haku = genreCheck(params.genre);

  const elokuvat: Elokuva[] = await haeGenre(haku);

  return (
    <>
      <h2 className="text-4xl py-2">{haku} elokuvat</h2>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
        {elokuvat.map((elokuva: Elokuva, idx: number) => {
          return <Elokuvalistaus elokuva={elokuva} />;
        })}
        <Link
          className="rounded-full bg-red-600 p-2 hover:bg-red-800 text-white text-center"
          href="/"
        >
          Palaa etusivulle
        </Link>
      </div>
    </>
  );
}
