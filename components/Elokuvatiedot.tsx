import { Elokuva } from "@/lib/elokuva_collection";
import React from "react";
import Image from "next/image";
import { Cast } from "@/types";
import Link from "next/link";
import Katselulistabtn from "./Katselulistabtn";

interface Props {
  elokuva: Elokuva;
  nayttelijaLista: Cast[];
  elokuvaKuvaus: string;
  listapituus: number;
  kesto: string;
  movie_id: string;
}

function Elokuvatiedot({
  elokuva,
  elokuvaKuvaus,
  listapituus,
  kesto,
  nayttelijaLista,
  movie_id
}: Props): React.ReactElement {
  return (
    <>
      <div className="flex flex-row max-sm:flex-col">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${elokuva.tmdbkuva}`}
            alt="Elokuvan juliste"
            width={342}
            height={512}
          />
        </div>

        <div className="pl-3 max-w-sm flex-row max-sm:flex-col relative">
          <div>
            {elokuva.nimi === elokuva.alkuperainennimi ? (
              <h1 className="text-3xl">{elokuva.nimi}</h1>
            ) : (
              <div>
                <h1 className="text-3xl">{elokuva.nimi}</h1>
                <h2 className="text-2xl">({elokuva.alkuperainennimi})</h2>
              </div>
            )}

            <p className="line-clamp-5 text-base">
              {elokuvaKuvaus.length != 0
                ? elokuvaKuvaus
                : "Kuvausta ei saatavilla"}
            </p>

            <div className="text-right">
              <label
                className="bg-inherit btn-ghost rounded-none text-blue-600 border-0"
                htmlFor="my-modal"
              >
                lue lisää...
              </label>

              <input type="checkbox" id="my-modal" className="modal-toggle" />

              <div className="modal">
                <div className="modal-box bg-white dark:bg-slate-800 text-left">
                  <p className="py-4">{elokuvaKuvaus}</p>
                  <div className="modal-action">
                    <label
                      htmlFor="my-modal"
                      className="btn text-black bg-white hover:bg-transparent"
                    >
                      Sulje
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-base my-2">Genret: {elokuva.genre.toString()}</p>

            <p className="text-base my-2">
              Valmistumisvuosi: {elokuva.valmistumisvuosi}
            </p>

            <p className="text-base my-2">
              Tuotantomaa(t): {elokuva.tuotantomaa.toString()}
            </p>

            <p className="text-base my-2">
              {kesto} ({elokuva.kestomin} min)
            </p>

            <p className="text-base mt-2">Elokuvan näyttelijöitä:</p>

            <p className="text-base mb-2">
              {nayttelijaLista.map((nayttelija: any, idx: number) => {
                if (listapituus !== idx + 1) {
                  return `${nayttelija.name}, `;
                } else {
                  return `${nayttelija.name}`;
                }
              })}
            </p>

            <p className="text-base my-2">
              Ohjaaja(t): {elokuva.ohjaaja.toString()}
            </p>
          </div>

          <Link className="w-full" href="/">
            <button className="w-paluunappiDesktop rounded-full bg-red-600 p-2 hover:bg-red-800 lg:absolute lg:ml-3 lg:inset-x-0 lg:bottom-0 text-white ">
              Palaa etusivulle
            </button>
          </Link>
        </div>
      </div>

      <Katselulistabtn movie_id={movie_id}/>

      <div className="grid grid-flow-row mt-2">
        <a href={elokuva.imdburl} target="_blank">
          <button className="rounded-full bg-red-600 p-2 hover:bg-red-800 text-white">
            Linkki elokuvan IMDB-sivulle
          </button>
        </a>

        <a
          href={`https://www.themoviedb.org/movie/${elokuva.tmdbid}`}
          target="_blank"
        >
          <button className="rounded-full bg-red-600 p-2 hover:bg-red-800 mt-2 text-white">
            Linkki elokuvan TMDB-sivulle
          </button>
        </a>
      </div>
    </>
  );
}

export default Elokuvatiedot;
