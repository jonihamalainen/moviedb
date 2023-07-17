'use client'

import { PoistaSupabaseKayttja } from "@/lib/supabase_collection";
import { dateConvert } from "@/utils/dateConvert";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import PoistoModal from "./Poistomodal";

interface Props {
  kayttaja: any;
}

function Kayttajalista({ kayttaja }: Props): React.ReactElement {
  const router = useRouter();
  const emailDate = dateConvert(kayttaja.email_confirmed_at);

  let lastSignInDate: string;

  if (kayttaja.last_sign_in_at !== null) {
    lastSignInDate = dateConvert(kayttaja.last_sign_in_at);
  } else {
    lastSignInDate = "Ei viimeisintä sisäänkirjautumista";
  }

  const modelInfo: string = `Haluatko varmasti poistaa käyttäjän ${kayttaja.email}`

  const poista = async (): Promise<void> => {
    const supabase = createClientComponentClient();
    await PoistaSupabaseKayttja(supabase, kayttaja.id);
    router.refresh();
  };

  return (
    <tr className="border-2 border-black">
      <td className="border-2 border-black">{kayttaja.email}</td>
      <td className="border-2 border-black">{emailDate}</td>
      <td className="border-2 border-black">{lastSignInDate}</td>
      <td className="border-2 border-black">
      <PoistoModal modalkey={kayttaja.id} info={modelInfo} onClickFunction={poista}/>
      </td>
    </tr>
  );
}

export default Kayttajalista;
