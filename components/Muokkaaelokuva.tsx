"use client";
import { Elokuva } from "@/lib/elokuva_collection";
import { genretFull } from "@/utils/genreLista";
import axios from "axios";
import { useRef, useState } from "react";
import Lisaamodal from "./Lisaamodal";
import PoistoModal from "./Poistomodal";

function Muokkaaelokuva(): React.ReactElement {
  const lomakeref: React.MutableRefObject<any> = useRef<HTMLFormElement>();
  const [idInput, setIdInput] = useState<string>("");
  const [elokuvaData, setElokuvaData] = useState<Elokuva | null>(null);
  const [ohjaajat, setOhjaajat] = useState<string[] | []>([]);
  const [elokuvanGenret, setElokuvanGenret] = useState<string[]>([]);
  const [ohjaajaInput, setOhjaajaInput] = useState<string>("");
  const [tuotantomaaInput, setTuotantomaaInput] = useState<string>("");
  const [tuotantomaa, setTuotantomaa] = useState<string[] | []>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [Error, setError] = useState<boolean>(false);
  const [muokkaus, setMuokkaus] = useState<boolean>(false);

  const haeElokuva = async () => {
    try {
      const id: string = idInput;
      const response = await axios.get("/api/elokuva", { params: { id } });
      setElokuvaData(response.data);
      setOhjaajat(response.data.ohjaaja);
      setTuotantomaa(response.data.tuotantomaa);
      setElokuvanGenret(response.data.genre);
    } catch (error) {
      console.log("Error");
    }
  };

  const muokkaa = async (elokuva: Elokuva) => {
    try {
      const id: string | undefined = elokuva?._id?.toString();
      const response = await axios.put("/api/elokuva", elokuva, {
        params: { id },
      });
      setModalOpen(false);
    } catch (error) {
      console.log("Error");
    }
  };

  const lisaaOhjaaja = () => {
    if (ohjaajaInput.trim() !== "") {
      setOhjaajat([...ohjaajat, ohjaajaInput]);
      setOhjaajaInput("");
    }
  };

  const lisaaTuotantomaa = () => {
    if (tuotantomaaInput.trim() !== "") {
      setTuotantomaa([...tuotantomaa, tuotantomaaInput]);
      setTuotantomaaInput("");
    }
  };

  const lisaaGenre = (valinta: string) => {
    if (elokuvanGenret.includes(valinta)) {
      setElokuvanGenret(
        elokuvanGenret.filter((genre: string) => genre !== valinta)
      );
    } else {
      setElokuvanGenret([...elokuvanGenret, valinta]);
    }
  };

  const tallennaTiedot = (e: React.FormEvent): void => {
    e.preventDefault();

    if (
      !lomakeref.current.nimi.value ||
      !lomakeref.current.apnimi.value ||
      !Number(lomakeref.current.valmistusvuosi.value) ||
      ohjaajat.length === 0 ||
      elokuvanGenret.length === 0 ||
      tuotantomaa.length === 0 ||
      !Number(lomakeref.current.kesto.value) ||
      !lomakeref.current.imdbid.value ||
      !lomakeref.current.imdburl.value ||
      !Number(lomakeref.current.tmdbid.value) ||
      !lomakeref.current.tmdbkuva.value
    ) {
      setError(true);
    } else {
      const elokuva: Elokuva = {
        _id: elokuvaData?._id,
        nimi: lomakeref.current.nimi.value,
        alkuperainennimi: lomakeref.current.apnimi.value,
        valmistumisvuosi: Number(lomakeref.current.valmistusvuosi.value),
        ohjaaja: ohjaajat,
        genre: elokuvanGenret,
        tuotantomaa: tuotantomaa,
        kestomin: Number(lomakeref.current.kesto.value),
        imdbid: lomakeref.current.imdbid.value,
        imdburl: lomakeref.current.imdburl.value,
        tmdbid: Number(lomakeref.current.tmdbid.value),
        tmdbkuva: lomakeref.current.tmdbkuva.value,
      };
      setError(false);
      setElokuvaData(elokuva);
      setModalOpen(true);
    }
  };

  const poista = (idx: number, arrayNimi: Array<any>, setArrayNimi: any) => {
    const uusiArray = [...arrayNimi];
    uusiArray.splice(idx, 1);
    setArrayNimi(uusiArray);
  };

  const poistaElokuva = async (elokuva: Elokuva) => {
    const id: string | undefined = elokuva?._id?.toString();
    const response = await axios.delete("/api/elokuva", {
      params: { id },
    });
  };

  return (
    <div className="form-control w-full max-w-xs">
      <input
        type="text"
        placeholder="Kirjoita elokuvan id"
        className="input w-full max-w-xs mt-2"
        value={idInput}
        onChange={(e: any) => setIdInput(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={haeElokuva}
      >
        Hae elokuva
      </button>
      {elokuvaData ? (
        <div className="grid grid-cols-2">
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => setMuokkaus(!muokkaus)}
          >
            Muokkaa
          </button>
          <PoistoModal
            info={`Haluatko varmasti poistaa elokuvan ${elokuvaData.nimi}?`}
            modalkey={elokuvaData.imdbid}
            onClickFunction={() => poistaElokuva(elokuvaData)}
          />
        </div>
      ) : null}
      {elokuvaData && muokkaus ? (
        <form id="movieadd" className="p-6 space-y-2" ref={lomakeref}>
          <label className="label">
            <span className="label-text">Nimi:</span>
          </label>
          <input
            type="text"
            name="nimi"
            className="input input-bordered w-full max-w-xs"
            defaultValue={elokuvaData?.nimi}
          />
          <label className="label">
            <span className="label-text">Alkuperäinen nimi:</span>
          </label>
          <input
            type="text"
            name="apnimi"
            defaultValue={elokuvaData?.alkuperainennimi}
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text">Valmistusvuosi:</span>
          </label>
          <input
            type="number"
            name="valmistusvuosi"
            className="input input-bordered w-full max-w-xs"
            defaultValue={elokuvaData?.valmistumisvuosi}
          />
          <label className="label">
            <span className="label-text">Ohjaajat:</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="ohjaajat"
              value={ohjaajaInput}
              onChange={(e) => setOhjaajaInput(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={() => lisaaOhjaaja()}
            >
              Lisää ohjaaja
            </button>
          </div>
          {ohjaajat?.length !== 0 ? (
            <ul>
              {ohjaajat?.map((ohjaaja: string, idx: number) => {
                return (
                  <li key={idx}>
                    {ohjaaja}
                    <button
                      className="btn"
                      onClick={() => poista(idx, ohjaajat, setOhjaajat)}
                    >
                      Poista
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
          <h1 className="text-xl">Lisää elokuvan genret</h1>
          <div className="grid grid-cols-2">
            {genretFull?.map((genre: string, idx: number) => {
              return (
                <label>
                  <input
                    key={idx}
                    type="checkbox"
                    defaultChecked={elokuvanGenret?.includes(genre)}
                    checked={elokuvanGenret?.includes(genre)}
                    onChange={() => lisaaGenre(genre)}
                  />
                  {genre}
                </label>
              );
            })}
          </div>
          <label className="label">
            <span className="label-text">Tuotantomaat:</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="tuotantomaat"
              value={tuotantomaaInput}
              onChange={(e) => setTuotantomaaInput(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={() => lisaaTuotantomaa()}
            >
              Lisää tuotantomaa
            </button>
          </div>
          {tuotantomaa?.length !== 0 ? (
            <ul>
              {tuotantomaa?.map((maa: string, idx: number) => {
                return (
                  <li key={idx}>
                    {maa}

                    <button
                      className="btn"
                      onClick={() => poista(idx, tuotantomaa, setTuotantomaa)}
                    >
                      Poista
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
          <label className="label">
            <span className="label-text">Kesto (min):</span>
          </label>
          <input
            defaultValue={elokuvaData.kestomin}
            type="number"
            name="kesto"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text">imdbid:</span>
          </label>
          <input
            defaultValue={elokuvaData.imdbid}
            type="text"
            name="imdbid"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text">imdburl:</span>
          </label>
          <input
            defaultValue={elokuvaData.imdburl}
            type="text"
            name="imdburl"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text">tmdbid:</span>
          </label>
          <input
            defaultValue={elokuvaData.tmdbid}
            type="number"
            name="tmdbid"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <label className="label">
            <span className="label-text">tmdbkuva:</span>
          </label>
          <input
            defaultValue={elokuvaData.tmdbkuva}
            type="text"
            name="tmdbkuva"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <button onClick={tallennaTiedot} className="btn w-full text-center">
            Esikatsele
          </button>
          <Lisaamodal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            elokuva={elokuvaData}
            onClickFunction={() => muokkaa(elokuvaData)}
          />
        </form>
      ) : null}
      {Boolean(Error) ? (
        <h1 className="text-center text-red-500">Tarkista syöttämäsi tiedot</h1>
      ) : null}
    </div>
  );
}

export default Muokkaaelokuva;
