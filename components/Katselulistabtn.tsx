"use client";
import { FaMinus, FaPlus } from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getSessionUserID } from "@/utils/supabaseUtils";
import { useEffect, useState } from "react";

interface Props {
  movie_id: string;
}

function Katselulistabtn({ movie_id }: Props): React.ReactElement {
  const supabase = createClientComponentClient();

  const [lisatty, setLisatty] = useState<boolean>(false);

  const fetchData = async () => {
    const { data } = await supabase
      .from("katselulista")
      .select("movie_id");
    const dataArray: any = data?.map(
      (item: { movie_id: String }) => item.movie_id
    );
    if (dataArray.includes(movie_id)) {
      setLisatty(true);
    }
  };

  const lisaaKatselulistaan = async (): Promise<void> => {
    const user_id: String = await getSessionUserID(supabase);

    const { data, error } = await supabase.from("katselulista").insert([
      {
        user_id: String(user_id),
        movie_id: String(movie_id),
      },
    ]);

    setLisatty(true);
  };

  const poistaKatselulistalta = async (): Promise<void> => {
    const user_id: String = await getSessionUserID(supabase);

    const { error } = await supabase
      .from("katselulista")
      .delete()
      .eq("movie_id", movie_id)
      .eq("user_id", user_id);

    setLisatty(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!lisatty ? (
        <button className="btn mt-1" onClick={lisaaKatselulistaan}>
          Lisää katselulistaan <FaPlus className="ml-2" />
        </button>
      ) : (
        <button className="btn mt-1" onClick={poistaKatselulistalta}>
          Poista katselulistalta <FaMinus className="ml-2" />
        </button>
      )}
    </>
  );
}

export default Katselulistabtn;
