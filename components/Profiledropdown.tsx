"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getSessionUserEmail, getSessionUserID } from "@/utils/supabaseUtils";
import Link from "next/link";

function Profiledropdown(): React.ReactElement {
  const haettu: React.MutableRefObject<boolean> = useRef<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [sessionEmail, setSessionEmail] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  const haeData = async (): Promise<void> => {
    setSessionId(String(await getSessionUserID(supabase)));
    setSessionEmail(String(await getSessionUserEmail(supabase)));
  };

  const kirjauduUlos = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    if (!haettu.current) {
      haeData();
    }
    return () => {
      haettu.current = true;
    };
  }, []);
  return (
    <div className="mt-2 col-span-full flex flex-row justify-end">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn m-1">
          <FaUserAlt />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content dark:bg-base-100 menu p-2 shadow bg-bg-white rounded-box w-52 border-2 border-black"
        >
          <li>
            <h1>{sessionEmail}</h1>
          </li>
          <li>
            <Link href={`/login/salasana`}>Vaihda salasana</Link>
          </li>
          <li>
            <Link href={`/katselulista`} onClick={() => router.refresh()}>Katselulista</Link>
          </li>
          <li>
            <button onClick={kirjauduUlos}>Kirjaudu ulos</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profiledropdown;
