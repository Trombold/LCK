import PropTypes from "prop-types";
import ListResults from "./list_results";
export default function Results({ title, results, isAverage = true }) {
  if (results.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-2xl text-center font-bold mb-4 dark:text-white ">
        {title}
      </h3>
      <ListResults results={results} isAverage={isAverage} />
    </div>
  );
}

Results.propTypes = {
  title: PropTypes.string,
  results: PropTypes.array.isRequired,
  isAverage: PropTypes.bool,
};
