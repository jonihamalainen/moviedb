"use client";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { isValidEmail } from "@/utils/isValidEmail";

function Salasanareset(): React.ReactElement {
  const lomakeref: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const [Error, setError] = useState<string>("");
  const [lahetetty, setLahetetty] = useState<boolean>(false);
  const lahetaLinkki = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    if (isValidEmail(lomakeref.current.email.value)) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        lomakeref.current.email.value, {
            redirectTo: "http://localhost:3000/login/salasana"
        }
      );
      if(data){
        setLahetetty(true)
      }
    } else {
      setError("true");
    }
  };

  return (
    <>
      {lahetetty ? (
        <div className="w-full max-w-xs flex items-center min-h-screen flex-col">
          <h1 className="text-3xl">Linkki lähetetty</h1>
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
            <button onClick={lahetaLinkki} className="btn w-full text-center">
              Lähetä linkki
            </button>
          </form>
          <div>
            {Boolean(Error) ? (
              <h1 className="text-center text-red-500">
                Virheellinen sähköposti
              </h1>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Salasanareset;
