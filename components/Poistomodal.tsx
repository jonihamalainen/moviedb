"use client";

interface Props {
  info: string;
  modalkey: string;
  onClickFunction: () => void;
}

function PoistoModal({ info, modalkey, onClickFunction }: Props): React.ReactElement {
  const modalId = `my_modal_${modalkey}`;

  return (
    <>
      <label htmlFor={modalId} className="btn ml-2 mt-2">
        Poista
      </label>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
           {info}
          </h3>
          <div className="modal-action">
              <label
                htmlFor={modalId}
                className="btn bg-red-600 hover:bg-red-800 text-white"
                onClick={onClickFunction}
              >
                Varmista poisto
              </label>
            <label htmlFor={modalId} className="btn">
              Sulje
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PoistoModal;
