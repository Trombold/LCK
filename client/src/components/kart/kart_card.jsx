import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteKartRequest } from "../../api/karts";
import { toast } from "react-toastify";
import { useState } from "react";
import cx from "clsx";

export default function KartCard({ id, categoria, numero, haveTransponder }) {
  const [isVisible, setIsVisible] = useState(true);

  const deleteKart = async () => {
    const resConfirm = await confirm("¿Estas seguro de eliminar este kart?");
    if (resConfirm) {
      await deleteKartRequest(id);
      setIsVisible(false);
      toast.success("Kart eliminado con exito");
    }
  };

  let cate;

  switch (categoria) {
    case "jr":
      cate = "Junior";
      break
    case "x30m":
      cate = "X30 Master";
      break
    case "x30s":
      cate = "X30 Senior";
      break
    case "open":
      cate = "Open";
      break
    case "parilla":
      cate = "Parilla";
      break
    default:
      cate = "Categoría no válida";
      break
  }

  return (
    <div
      className={cx(
        "max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-gray-50 border border-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800",
        { hidden: !isVisible, invisible: !isVisible }
      )}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {cate}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Número: {numero}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Tiene transponder propio: {haveTransponder ? "Si" : "No"}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between gap-4">
        <Link
          to={`/karts/${id}`}
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Editar
        </Link>
        <button
          onClick={deleteKart}
          className="bg-red-500 hover:bg-red-700 dark:hover:bg-red-900 dark:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

KartCard.propTypes = {
  id: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
  numero: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  haveTransponder: PropTypes.bool.isRequired,
};
