"use client";
import { ElokuvaNostoTiedot } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
  elokuvat: ElokuvaNostoTiedot[];
}

function Lisaanosto({ elokuvat }: Props): React.ReactElement {
  const [naytaLisays, setNaytaLisays] = useState("invisible");

  const lomakeref: React.MutableRefObject<any> = useRef<HTMLFormElement>();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: string = event.target.value;
    setSelectedValues([...selectedValues, selectedValue]);
  };

  const lisaaNosto = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const movieIds: string[] = selectedValues.map(
      (str: string) => str.split(",")[0]
    );
    const movieIdsJSON = JSON.parse(JSON.stringify(movieIds));
    const { error } = await supabase
      .from("nosto_listat")
      .insert({ nimi: lomakeref.current.nimi.value, elokuvat: movieIdsJSON });
    setNaytaLisays("invisible");
    setSelectedValues([]);
  };

  return (
    <>
      {naytaLisays === "invisible" ? (
        <button
          onClick={() => setNaytaLisays("visible")}
          className="btn btn-outline mt-2 ml-2"
        >
          Luo uusi lista
        </button>
      ) : (
        <div className={`${naytaLisays} text-3xl`}>
          <form id="nosto" className="p-6 space-y-2" ref={lomakeref}>
            <div>
              <label className="label">
                <span className="label-text">Uuden listauksen nimi:</span>
              </label>
              <input
                type="text"
                name="nimi"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Valitse listalta elokuva jonka haluat lisätä listaan
                </span>
              </label>
              <select
                onChange={handleSelectChange}
                className="select select-bordered"
              >
                <option disabled selected>
                  Valitse elokuva
                </option>
                {elokuvat.map((elokuva: ElokuvaNostoTiedot) => {
                  return (
                    <option value={[elokuva._id, elokuva.nimi]}>
                      {elokuva.nimi}
                    </option>
                  );
                })}
              </select>
            </div>
            <ul>
              {selectedValues.map((value: string, index: number) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
            <button onClick={lisaaNosto} className="btn w-full text-center">
              Lisää uusi nostolistaus
            </button>
          </form>
          <button
            onClick={() => setNaytaLisays("invisible")}
            className="btn btn-outline mt-2 ml-2"
          >
            Peruuta
          </button>
        </div>
      )}
    </>
  );
}

export default Lisaanosto;
