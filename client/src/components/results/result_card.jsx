import cx from "clsx";
import { useState } from "react";
import {toast } from "react-toastify";
import PropTypes from "prop-types";
import { deleteResultRequest } from "../../api/results";

export default function ResultCard({ result }) {
  const [isVisible, setIsVisible] = useState(true);

  const deleteResult = async () => {
    const resConfirm = await confirm("¿Estas seguro de eliminar este resultado?");
    if (resConfirm) {
      await deleteResultRequest(result._id);
      setIsVisible(false);
      toast.success("Resultado eliminado con exito");
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
          {result.title}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap justify-start gap-4">
        <button
          onClick={deleteResult}
          className="bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  result: PropTypes.object.isRequired,
};
