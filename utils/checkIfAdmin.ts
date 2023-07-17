import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const checkIfAdmin = async (
    supabase: SupabaseClient<any, "public", any>
  ): Promise<void> => {

    const { data: activeSession } = await supabase.auth.getSession();

    const { data: user } = await supabase.from("user").select("*").single();

    if(!activeSession.session || user?.role !== "admin" ){
        redirect("/")
    }

  };
  