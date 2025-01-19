import cx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { patchNameTransponderkartRequest } from "../../api/karts";
import { toast } from "react-toastify";
export default function Transponder({ length, index, transponder }) {
  const updateNameTransponder = async () => {
    try {
      const data = { nameTransponder };
      await patchNameTransponderkartRequest(transponder.id, data);
      toast.success("Nombre de transponder actualizado");
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar el transponder");
    }
  };

  const [nameTransponder, setNameTransponder] = useState(
    transponder.nameTransponder
  );
  return (
    <div className={cx("grid grid-cols-11")}>
      <div
        className={cx(
          "col-span-1 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
          { "rounded-bl-lg": index === length - 1 }
        )}
      >
        {index + 1}
      </div>
      <div className="col-span-1 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
        {transponder.number}
      </div>
      <div className="col-span-1 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
        {transponder.category}
      </div>
      <div className="col-span-2 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
        {transponder.haveTransponder ? "Si" : "No"}
      </div>
      <div className="col-span-4 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
        <input
          className="w-full p-2  rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          type="text"
          value={nameTransponder}
          placeholder="Introducir nombre del transponder"
          onChange={(e) => setNameTransponder(e.target.value)}
        />
      </div>
      <div
        className={cx(
          "col-span-2 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
          { "rounded-br-lg": index === length - 1 }
        )}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 w-full py-2 px-2 rounded-md text-white"
          type="button"
          onClick={updateNameTransponder}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}

Transponder.propTypes = {
  length: PropTypes.number,
  index: PropTypes.number,
  transponder: PropTypes.object,
};
