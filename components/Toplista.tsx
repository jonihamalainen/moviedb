import { TopLista } from "@/types";

interface Props {
  toplista: TopLista;
}

function Toplista({ toplista }: Props): React.ReactElement {
  return (
    <tr className="border-2 border-black">
      <td className="border-2 border-black">{toplista.nimi}</td>
      <td className="border-2 border-black">{toplista.klikkaukset}</td>
    </tr>
  );
}

export default Toplista;
