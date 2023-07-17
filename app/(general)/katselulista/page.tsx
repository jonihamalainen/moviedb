import Elokuvalistaus from "@/components/Elokuvalistaus";
import { Elokuva, haeKatselulista } from "@/lib/elokuva_collection";
import { lisaaSivuLataus } from "@/lib/supabase_collection";
import { UserSessionDetails } from "@/types";
import { getSessionUserDetails } from "@/utils/supabaseUtils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 0

export default async function KatselulistaPage(): Promise<React.ReactElement> {

  const supabase = createServerComponentClient({ cookies });

  await lisaaSivuLataus(supabase);

  const userDetails: UserSessionDetails = await getSessionUserDetails(supabase);

  const { data } = await supabase
    .from("katselulista")
    .select("movie_id")
  const dataArray: string[] | undefined = data?.map(
    (item: { movie_id: string }) => item.movie_id
  );

  const elokuvat: Elokuva[] = JSON.parse(
    JSON.stringify(await haeKatselulista(dataArray))
  );


  return (
    <>
      <h1 className="text-4xl py-2">
        Käyttäjän {userDetails.email} katselulista
      </h1>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
        {elokuvat.map((elokuva: Elokuva, idx: number) => {
          return <Elokuvalistaus elokuva={elokuva} />;
        })}
      </div>
    </>
  );
}
