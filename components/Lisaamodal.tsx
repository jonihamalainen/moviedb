import { ElokuvaLisays } from "@/types";

interface Props {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  elokuva: ElokuvaLisays;
  onClickFunction: (elokuva: ElokuvaLisays) => void;
}

function Lisaamodal({
  modalOpen,
  setModalOpen,
  elokuva,
  onClickFunction
}: Props): React.ReactElement {

  return (
    <div>
      <input
        type="checkbox"
        id="my_modal"
        className="modal-toggle"
        checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-3xl">Elokuvan esikatselu</h3>
          <h1 className="text-2xl">Elokuvan nimi:</h1>
          <p className="text-xl">{elokuva?.nimi}</p>
          <h1 className="text-2xl">Elokuvan alkuperainennimi:</h1>
          <p className="text-xl">{elokuva?.alkuperainennimi}</p>
          <h1 className="text-2xl">Elokuvan valmistumisvuosi:</h1>
          <p className="text-xl">{elokuva?.valmistumisvuosi}</p>
          <h1 className="text-2xl">Elokuvan ohjaajat:</h1>
          {elokuva?.ohjaaja.map((ohjaaja: string, idx: number) => {
            return <p className="text-xl">{ohjaaja}</p>;
          })}
          <h1 className="text-2xl">Elokuvan genret:</h1>
          {elokuva?.genre.map((genre: string, idx: number) => {
            return <p className="text-xl">{genre}</p>;
          })}
          <h1 className="text-2xl">Elokuvan tuotantomaat:</h1>
          {elokuva?.tuotantomaa.map((tuotantomaa: string, idx: number) => {
            return <p className="text-xl">{tuotantomaa}</p>;
          })}
          <h1 className="text-2xl">Elokuvan kesto(min):</h1>
          <p className="text-xl">{elokuva?.kestomin}</p>
          <h1 className="text-2xl">Elokuvan imdbid:</h1>
          <p className="text-xl">{elokuva?.imdbid}</p>
          <h1 className="text-2xl">Elokuvan imdburl:</h1>
          <p className="text-xl">{elokuva?.imdburl}</p>
          <h1 className="text-2xl">Elokuvan tmdbid:</h1>
          <p className="text-xl">{elokuva?.tmdbid}</p>
          <h1 className="text-2xl">Elokuvan tmbdkuva:</h1>
          <p className="text-xl">{elokuva?.tmdbkuva}</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn" onClick={() => onClickFunction(elokuva)}>
              Lisää elokuva
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={() => setModalOpen(false)}
            >
              Sulje
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lisaamodal;
