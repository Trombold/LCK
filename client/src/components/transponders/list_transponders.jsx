import PropTypes from "prop-types";
import cx from "clsx";
import Transponder from "./transponder";

export default function ListTransponders({ transponders }) {
  
  if (transponders.length === 0) {
    return (
      <div className="flex justify-center items-center h-52 dark:text-white text-xl font-semibold">
        <p>No hay karts inscritos a una válida actual</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-t-md rounded-b-md">
      <div className={cx("grid grid-cols-11")}>
        <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          #
        </div>
        <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Nro Kart
        </div>
        <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Categoría
        </div>
        <div className="col-span-2 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Transponder Propio
        </div>
        <div className="col-span-4 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Nombre Transponder
        </div>
        <div className="col-span-2 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Actualizar
        </div>
      </div>
      <div>
        {transponders.map((transponder, index) => (
          <Transponder
            key={index}
            length={transponders.length}
            index={index}
            transponder={transponder}
          />
        ))}
      </div>
    </div>
  );
}

ListTransponders.propTypes = {
  transponders: PropTypes.object.isRequired,
};
