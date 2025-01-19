import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import cx from "clsx";
import {
  deleteValidateRequest,
} from "../../api/validates";

export default function ChampionshipCard({
  id,
  title,
  description,
  open,
  dateInit,
  dateEnd,
}) {
  const [isEnabled] = useState(open);
  const [isVisible, setIsVisible] = useState(true);

  const deleteValidate = async () => {
    const resConfirm = await confirm("¿Estás seguro de eliminar este campeonato?");
    if (resConfirm) {
      await deleteValidateRequest(id);
      setIsVisible(false);
      toast.success("Campeonato eliminada con exito");
    }
  };

  return (
    <div
      className={cx(
        "max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-gray-50 border border-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800",
        { hidden: !isVisible, invisible: !isVisible }
      )}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {description}
        </p>
        <p
          className={cx(
            "text-gray-700 dark:text-gray-300 text-base font-medium",
            isEnabled
              ? "text-green-500 dark:text-green-500"
              : "text-red-500 dark:text-red-500"
          )}
        >
          {isEnabled ? "Habilitado" : "Deshabilitado"}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {dateInit} - {dateEnd}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap justify-start gap-4">
        <Link
          to={`/manage/championship/${id}`}
          className="bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded"
        >
          Editar
        </Link>
        <button
          onClick={deleteValidate}
          className="bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

ChampionshipCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  open: PropTypes.bool.isRequired,
  dateInit: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};
