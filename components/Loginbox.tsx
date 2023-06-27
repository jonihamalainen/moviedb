"use client";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function Loginbox(): React.ReactElement {
  const lomakeref: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const router = useRouter();
  const [Error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const kirjaudu = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: lomakeref.current.tunnus.value,
      password: lomakeref.current.salasana.value,
    });
    if (!error) {
      setLoading(true);
      router.push("/");
    } else {
      setError("false");
    }
    lomakeref.current.reset();
  };

  return (
    <>
    {loading
    ? <h1>Uudelleenohjataan...</h1>
    : <div className="form-control w-full max-w-xs">
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
      {Boolean(Error) ? (
        <h1 className="text-center text-red-500">
          Virheellinen käyttäjätunnus tai salasana. Tarkasta tiedot ja yritä
          uudelleen
        </h1>
      ) : null}
    </div>
  </div>
    }
    </>
  );
}

export default Loginbox;
