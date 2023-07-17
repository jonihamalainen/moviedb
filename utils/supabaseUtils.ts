import { TopLista, UserSessionDetails } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getSessionUserID = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<String> => {
  const { data } = await supabase.auth.getSession();

  const user_id = data.session?.user.id;

  return String(user_id);
};

export const getSessionUserEmail = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<string> => {
  const { data } = await supabase.auth.getSession();

  const user_email = data.session?.user.email;

  return String(user_email);
};

export const getSessionUserDetails = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<UserSessionDetails> => {
  const { data } = await supabase.auth.getSession();

  const user_email = data.session?.user.email;

  const user_id = data.session?.user.id;

  return { email: user_email, id: user_id };
};

export const haeTopGenret = (genret: JSON[], maara: number): string[] => {
  
  const sanat: any[] = genret.flat();

  const esiintymat: { [sana: string]: number } = {};

  for (const sana of sanat) {
    esiintymat[sana] = (esiintymat[sana] || 0) + 1;
  }

  const lajitellutSanat: string[] = Object.keys(esiintymat).sort((a, b) => esiintymat[b] - esiintymat[a]);

  const TopGenret:string[] = lajitellutSanat.slice(0, maara);

  return TopGenret;
};
