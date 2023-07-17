import TakaisinNappi from "@/components/TakaisinNappi";
import Uusielokuva from "@/components/Uusielokuva";
import { checkIfAdmin } from "@/utils/checkIfAdmin";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

async function LisaaPage(): Promise<React.ReactElement> {
  const supabase = createServerComponentClient({ cookies });

  await checkIfAdmin(supabase);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-3xl">Lisää uusi elokuva tietokantaan</h1>
      <h1 className="text-lg">
        Mikäli tietoa ei ole kirjaa kenttään esim. "-"
      </h1>
      <Uusielokuva />
      <Link href="/admin">
        <TakaisinNappi />
      </Link>
    </div>
  );
}

export default LisaaPage;
