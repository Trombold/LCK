import PropTypes from "prop-types";
import cx from "clsx";

export default function ListResults({ results, isAverage = true }) {
  return (
    <div className="overflow-x-auto rounded-t-md rounded-b-md">
      <div
        className={cx(
          "grid",
          { "grid-cols-10": !isAverage },
          { "grid-cols-8": isAverage }
        )}
      >
        <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Lugar
        </div>
        <div className="col-span-1 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Nro Kart
        </div>
        <div className="col-span-4 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
          Piloto
        </div>
        {!isAverage && (
          <div className="col-span-2 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200">
            Tiempo
          </div>
        )}
        <div className="col-span-2 bg-gray-200 dark:bg-gray-700 p-2 font-semibold text-gray-800 dark:text-gray-200 rounded-tr-md">
          Puntos
        </div>
      </div>
      <div>
        {results.map((result, index) => (
          <div
            className={cx(
              "grid",
              { "grid-cols-10": !isAverage },
              { "grid-cols-8": isAverage }
            )}
            key={index}
          >
            <div
              className={cx(
                "col-span-1 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
                { "rounded-bl-lg": index === results.length - 1 }
              )}
            >
              {result.placed}
            </div>
            <div className="col-span-1 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              {result.numberKart}
            </div>
            <div className="col-span-4 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              {result.name}
            </div>
            {!isAverage && (
              <div className="col-span-2 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                {result.time}
              </div>
            )}
            <div
              className={cx(
                "col-span-2 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
                { "rounded-br-lg": index === results.length - 1 }
              )}
            >
              {result.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ListResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      placed: PropTypes.number.isRequired,
      numberKart: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
  isAverage: PropTypes.bool.isRequired,
};
