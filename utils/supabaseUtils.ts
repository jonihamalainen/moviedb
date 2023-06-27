import { UserSessionDetails } from "@/types";
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

export const getSessionUserDetails = async (supabase: SupabaseClient<any, "public", any>
): Promise<UserSessionDetails> => {
  const { data } = await supabase.auth.getSession();

  const user_email = data.session?.user.email;

  const user_id = data.session?.user.id;

  return {email: user_email, id: user_id};
};