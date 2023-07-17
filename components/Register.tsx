"use client";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { isValidEmail } from "@/utils/isValidEmail";

function Register(): React.ReactElement {
  const lomakeref: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const [Error, setError] = useState<string>("");
  const [vaihdettu, setVaihdettu] = useState<boolean>(false);
  const register = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    if (
      lomakeref.current.salasana.value ===
        lomakeref.current.salasanavahvistus.value &&
      lomakeref.current.salasana.value.length >= 5 &&
      isValidEmail(lomakeref.current.email.value)
    ) {
      const { data, error } = await supabase.auth.signUp({
        email: lomakeref.current.email.value, 
        password: lomakeref.current.salasana.value,
        options: {
            emailRedirectTo: "http://localhost:3000/login"
        }
      });
      if (data.user?.identities?.length != 0) {
        setVaihdettu(true);
      } else {
        setError("Käyttäjä on jo olemassa tällä sähköpostilla")
      }
    } else {
      setError("  Salasanat eivät täsmää, tarkista salasana tai uusi salasana on liian lyhyt (min 5 merkkiä) tai sähköposti on virheellinen");
    }
  };

  return (
    <>
      {vaihdettu ? (
        <div className="w-full max-w-xs flex items-center min-h-screen flex-col">
          <h1 className="text-3xl">
            Tarkista sähköposti kirjautumislinkkiä varten
          </h1>
          <Link href="/">
            <button className="w-paluunappiDesktop rounded-full bg-red-600 p-2 hover:bg-red-800 lg:ml-3 lg:inset-x-0 lg:bottom-0 text-white mt-2">
              Palaa etusivulle
            </button>
          </Link>
        </div>
      ) : (
        <div className="form-control w-full max-w-xs">
          <form id="login" className="p-6 space-y-2" ref={lomakeref}>
            <label className="label">
              <span className="label-text">Sähköposti:</span>
            </label>
            <input
              type="text"
              name="email"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Uusi salasana:</span>
            </label>
            <input
              type="password"
              name="salasana"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Vahvista salasana:</span>
            </label>
            <input
              type="password"
              name="salasanavahvistus"
              className="input input-bordered w-full max-w-xs"
            />
            <button onClick={register} className="btn w-full text-center">
              Luo tunnus
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

export default Register;
