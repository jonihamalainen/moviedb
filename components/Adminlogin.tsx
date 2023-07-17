"use client";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function AdminLogin(): React.ReactElement {
  const lomakeref: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const [Error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const kirjaudu = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: lomakeref.current.tunnus.value,
      password: lomakeref.current.salasana.value,
    });
    if (!error) {
      const { data: user } = await supabase.from("user").select("*").single();
      if (user?.role !== "admin") {
        setError("Käyttäjällä ei ole admin oikeuksia");
      } else {
        setLoading(true);
        router.refresh()
      }
    } else {
      setError(" Virheellinen käyttäjätunnus tai salasana. Tarkasta tiedot ja yritä uudelleen");
    }
  };

  return (
    <>
      {loading ? (
        <h1>Odota...</h1>
      ) : (
        <div className="form-control w-full max-w-xs">
          <form id="login" className="p-6 space-y-2" ref={lomakeref}>
            <label className="label">
              <span className="label-text">Käyttäjätunnus:</span>
            </label>
            <input
              type="text"
              name="tunnus"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Salasana:</span>
            </label>
            <input
              type="password"
              name="salasana"
              className="input input-bordered w-full max-w-xs"
            />
            <button onClick={kirjaudu} className="btn w-full text-center">
              Kirjaudu sisään
            </button>
          </form>
          <div>
            {Error ? (
              <h1 className="text-center text-red-500">
               {Error}
              </h1>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminLogin;
