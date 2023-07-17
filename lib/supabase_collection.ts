import { getSessionUserID } from "@/utils/supabaseUtils";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { Elokuva } from "./elokuva_collection";

export const haeSupabaseKayttajat = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<PostgrestSingleResponse<any>> => {
  try {
    const userID: String = await getSessionUserID(supabase);

    const kayttajat: PostgrestSingleResponse<any> = await supabase
      .rpc("list_all_users")
      .neq("id", userID);

    return kayttajat;
  } catch (e: any) {
    const message: string = "Virhe haettaessa käyttäjätietoja";

    throw new Error(message);
  }
};

export const PoistaSupabaseKayttja = async (
  supabase: SupabaseClient<any, "public", any>,
  userId: any
): Promise<void> => {
  try {
    const { error } = await supabase.rpc("delete_user_by_id_function", {
      user_id: userId,
    });
  } catch (error) {
    const message: string = "Virhe poistettaessa käyttäjää";

    throw new Error(message);
  }
};

export const haeNostoListat = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("nosto_listat")
      .select("*")
      .order("id");
    if (!error) {
      return data;
    } else {
      return error;
    }
  } catch (error) {
    const message: string = "Virhe haettaessa nostolistoja";

    throw new Error(message);
  }
};

export const haeJulkaistutListat = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("nosto_listat")
      .select("*")
      .order("id")
      .eq("julkaistu", Boolean("TRUE"));
    if (!error) {
      return data;
    } else {
      return error;
    }
  } catch (error) {
    const message: string = "Virhe haettaessa nostolistoja";

    throw new Error(message);
  }
};

export const lisaaSivuLataus = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("tilastot")
      .select("sivulataukset");

    if (error) {
      return;
    }

    if (data.length === 0) {
      await supabase.from("tilastot").insert([{ sivulataukset: 1 }]);
    } else {
      const existingCount: number = data[0].sivulataukset;
      const newCount: number = existingCount + 1;
      await supabase
        .from("tilastot")
        .update({ sivulataukset: newCount })
        .eq("id", 1);
    }
  } catch (e: any) {
    const message: string = "Virhe haettaessa käyttäjätietoja";

    throw new Error(message);
  }
};

export const lisaaVierailu = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<void> => {
  try {
    const { data, error } = await supabase.from("tilastot").select("vierailut");

    if (error) {
      return;
    }

    if (data.length === 0) {
      await supabase.from("tilastot").insert([{ vierailut: 1 }]);
    } else {
      const existingCount: number = data[0].vierailut;
      const newCount: number = existingCount + 1;
      await supabase
        .from("tilastot")
        .update({ vierailut: newCount })
        .eq("id", 1);
    }
  } catch (e: any) {
    const message: string = "Virhe haettaessa käyttäjätietoja";

    throw new Error(message);
  }
};

export const haeTilastot = async (
  supabase: SupabaseClient<any, "public", any>
): Promise<any> => {
  try {
    const tilastot: PostgrestSingleResponse<any> = await supabase
      .from("tilastot")
      .select("*")
      .single();

    return tilastot;
  } catch (e: any) {
    const message: string = "Virhe haettaessa tilastoja";

    throw new Error(message);
  }
};

export const lisaaElokuvaKatselu = async (
  supabase: SupabaseClient<any, "public", any>,
  elokuva: Elokuva
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("suosikit")
      .select("*")
      .eq("movie_id", elokuva._id);

    if (!data?.length) {
      const { error } = await supabase.from("suosikit").insert({
        movie_id: elokuva._id,
        genre: elokuva.genre,
        klikkaukset: 1,
        nimi: elokuva.nimi
      });
    } else {
      const existingCount: number = data[0].klikkaukset;
      const newCount: number = existingCount + 1;
      const { error } = await supabase
        .from("suosikit")
        .update({ klikkaukset: newCount })
        .eq("movie_id", elokuva._id);
    }
  } catch (e: any) {
    const message: string = "Virhe haettaessa elokuvia";

    throw new Error(message);
  }
};

export const haeTopElokuvat = async ( supabase: SupabaseClient<any, "public", any>): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("suosikit")
      .select("*")
      .order("klikkaukset", { ascending: false })
      return data;
  } catch (e: any) {
    const message: string = "Virhe haettaessa toplistaa";

    throw new Error(message);
  }
};

