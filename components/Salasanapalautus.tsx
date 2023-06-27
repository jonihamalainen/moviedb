"use client";
import { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { getSessionUserEmail } from "@/utils/supabaseUtils";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/utils/isValidEmail";

 function Salasanapalautus(): React.ReactElement {
    const haettu: React.MutableRefObject<boolean> = useRef<boolean>(false);
    const router = useRouter()
    const supabase = createClientComponentClient();

    const userCheck = async () => {
        const email: string = await getSessionUserEmail(supabase);

        if(!isValidEmail(email)) {
            router.push("/login")
        } else {
            setTarkistettu(true)
        }
    }

  const lomakeref: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const [Error, setError] = useState<string>("");
  const [vaihdettu, setVaihdettu] = useState<boolean>(false);
  const [tarkistettu, setTarkistettu] = useState<boolean>(false);
  const vaihdaSalasana = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const userEmail: string = await getSessionUserEmail(supabase)
    if (
      lomakeref.current.salasana.value ===
        lomakeref.current.salasanavahvistus.value &&
      lomakeref.current.salasana.value.length >= 5
    ) {
      const {data, error} = await supabase.auth.updateUser({
        email: userEmail,
        password: lomakeref.current.salasana.value
      })
      if(data) {
        setVaihdettu(true)
      }
    } else {
      setError("True");
    }
  };

  useEffect(() => {
    if (!haettu.current) {
        userCheck();
      }
      return () => {
        haettu.current = true;
      };
  }, []);

  return (
    <>
      {vaihdettu && tarkistettu ? (
        <div className="w-full max-w-xs flex items-center min-h-screen flex-col">
          <h1 className="text-3xl">Salasana vaihdettu</h1>
          <Link href="/">
            <button className="w-paluunappiDesktop rounded-full bg-red-600 p-2 hover:bg-red-800 lg:ml-3 lg:inset-x-0 lg:bottom-0 text-white mt-2">
              Palaa etusivulle
            </button>
          </Link>
        </div>
      ) : (
        null
      )}
      {!tarkistettu ?
        <h1>Odota hetki...</h1>
        :   <div className="form-control w-full max-w-xs">
        <form id="login" className="p-6 space-y-2" ref={lomakeref}>
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
          <button onClick={vaihdaSalasana} className="btn w-full text-center">
            Vaihda salasana
          </button>
        </form>
        <div>
          {Boolean(Error) ? (
            <h1 className="text-center text-red-500">
              Salasanat eivät täsmää, tarkista salasana tai uusi salasana on
              liian lyhyt (min 5 merkkiä)
            </h1>
          ) : null}
        </div>
      </div>
      }
    </>
  );
}

export default Salasanapalautus;