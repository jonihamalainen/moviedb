import AdminLogin from "@/components/Adminlogin";
import Signout from "@/components/Signout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

async function AdminPage(): Promise<React.ReactElement> {
  const supabase = createServerComponentClient({ cookies });

  const { data: activeSession } = await supabase.auth.getSession();

  const { data: user } = await supabase.from("user").select("*").single();

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      {!activeSession.session || user?.role !== "admin" ? (
        <>
          <h1 className="text-2xl">Admin kirjautuminen</h1>
          <AdminLogin />
        </>
      ) : (
        <>
          <h1 className="text-3xl">Tervetuloa Admin työpöydälle</h1>
          <div className="grid grid-cols-2 grid-rows-3">
            <div>
              <Link href={"/admin/kayttajahallinta"}>
                <button className="btn btn-outline mt-2">
                  Käyttäjähallinta
                </button>
              </Link>
            </div>
            <div>
              <Link href={"/admin/nostot"}>
                <button className="btn btn-outline mt-2 ml-2">
                  Etusivun nostot
                </button>
              </Link>
            </div>
            <div>
              <Link href={"/admin/tilastot"}>
                <button className="btn btn-outline mt-2">Tilastot</button>
              </Link>
            </div>
            <div>
              <Link href={"/admin/lisaa"}>
                <button className="btn btn-outline mt-2 ml-2">
                  Lisää uusi elokuva
                </button>
              </Link>
            </div>
            <div>
              <Link href={"/admin/muokkaa"}>
                <button className="btn btn-outline mt-2">Muokkaa elokuvaa</button>
              </Link>
            </div>
          </div>
          <div>
            <Signout />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPage;
