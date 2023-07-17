"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function Signout(): React.ReactElement {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const kirjauduUlos = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      className="btn bg-red-600 hover:bg-red-800 text-white mt-2"
      onClick={kirjauduUlos}
    >
      Kirjaudu ulos
    </button>
  );
}

export default Signout;
