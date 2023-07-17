"use client";

import { haeNostoListat } from "@/lib/supabase_collection";
import { NostoLista } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import PoistoModal from "./Poistomodal";

function Hallitsenostoja(): React.ReactElement {
  const [nostolista, setNostoLista] = useState<NostoLista[]>();

  const supabase = createClientComponentClient();

  const paivita = async (): Promise<void> => {
    setNostoLista(JSON.parse(JSON.stringify(await haeNostoListat(supabase))));
  };

  const julkaise = async (lista: NostoLista): Promise<void> => {
    const { data, error } = await supabase
      .from("nosto_listat")
      .update({ julkaistu: !lista.julkaistu })
      .eq("id", lista.id);
  };

  const poista = async (lista: NostoLista): Promise<void> => {
    const { error } = await supabase
      .from("nosto_listat")
      .delete()
      .eq("id", lista.id);
  };

  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
      },
      paivita
    )
    .subscribe();

  useEffect(() => {
    paivita();
  }, []);

  return (
    <>
      <h1 className="text-2xl mt-2">Tehdyt nostolistat</h1>
      <ul>
        {nostolista ? (
          nostolista.map((lista: NostoLista, idx: number) => {
            return (
              <li className="p-2 mb-1" key={idx}>
                <input
                  type="checkbox"
                  className="m-2"
                  checked={Boolean(lista.julkaistu)}
                  onClick={() => julkaise(lista)}
                />
                {lista.nimi}
                <PoistoModal
                  modalkey={String(lista.id)}
                  info={`Poistetaanko lista ${lista.nimi}`}
                  onClickFunction={() => poista(lista)}
                />
              </li>
            );
          })
        ) : (
          <h1>Ei listoja</h1>
        )}
      </ul>
    </>
  );
}

export default Hallitsenostoja;
