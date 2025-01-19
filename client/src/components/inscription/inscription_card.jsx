import PropTypes from "prop-types";
import { useState } from "react";
import {
  confirmInscriptionRequest,
  deleteInscriptionRequest,
} from "../../api/inscriptions";
import { toast } from "react-toastify";
import cx from "clsx";
export default function InscriptionCard({ inscription }) {
  const [isPending, setIsPending] = useState(inscription.state === "pending");
  const [isDeleted, setIsDeleted] = useState(false);
  const confirmInscription = async () => {
    try {
      await confirmInscriptionRequest(inscription.id);
      setIsPending(false);
      toast.success("Inscripción confirmada con exito");
    } catch (error) {
      console.error("Error confirming inscription:", error);
    }
  };

  const cancelInscription = async () => {
    try {
      await deleteInscriptionRequest(inscription.id);
      setIsDeleted(true);
      toast.success("Inscripción cancelada con exito");
    } catch (error) {
      console.error("Error canceling inscription:", error);
    }
  };

  return (
    <div
      key={inscription.id}
      className={cx("bg-white shadow-md rounded-md p-4", {
        "hidden invisible": isDeleted,
      })}
    >
      <h2 className="text-lg font-semibold mb-2">
        Inscripción ID: {inscription.id}
      </h2>
      <p>
        <strong>Válida:</strong> {inscription.id_validate}
      </p>
      <p>
        <strong>Competidor:</strong> {inscription.id_user}
      </p>
      <p>
        <strong>Números de Karts:</strong> {inscription.id_karts.join(", ")}
      </p>
      <p className={isPending ? "text-red-500" : "text-green-500"}>
        <strong>Estado:</strong> {isPending ? "Pendiente" : "Aprobada"}
      </p>
      <div className="mt-2">
        <strong>URL Imagen:</strong>
        <br />
        <img
          src={inscription.url_image}
          alt="Imagen de inscripción"
          className="max-w-full h-auto mt-2"
        />
      </div>
      <div className="w-full mt-4 flex gap-4 justify-center">
        <button
          className="bg-red-500 hover:bg-red-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={cancelInscription}
        >
          Rechazar
        </button>
        {isPending && (
          <button
            className="bg-blue-500 hover:bg-blue-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={confirmInscription}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
}

InscriptionCard.propTypes = {
  inscription: {
    id: PropTypes.string.isRequired,
    id_validate: PropTypes.string.isRequired,
    id_user: PropTypes.string.isRequired,
    id_karts: PropTypes.array.isRequired,
    state: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  },
};
