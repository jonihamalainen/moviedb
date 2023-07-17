import { Elokuva } from "@/lib/elokuva_collection";
import { NostoLista } from "@/types";
import Elokuvalistaus from "./Elokuvalistaus";

interface Props {
  lista: NostoLista;
  nostoelokuvat: Elokuva[];
}

function Nosto({ lista, nostoelokuvat }: Props): React.ReactElement {

  const nostoElokuvatSimple: Elokuva[]  = JSON.parse(
    JSON.stringify(nostoelokuvat)
  );;

  return (
    <div>
      <h1 className="text-4xl py-2">{lista.nimi}</h1>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
        {nostoElokuvatSimple.map((elokuva: Elokuva, idx: number) => {
          return <Elokuvalistaus elokuva={elokuva} />;
        })}
      </div>
    </div>
  );
}

export default Nosto;
