import { useEffect, useState } from "react";
import {
  getAllResultsActiveRequest,
  getResultsClosedActiveRequest,
  getResultsOpenActiveRequest,
  getResultsTotalActiveRequest,
} from "../api/results";
import Loader from "../components/loader";
import Results from "../components/results/results";

export default function ResultsPage() {
  const [allResults, setAllResults] = useState([]);
  const [resultsOpen, setResultsOpen] = useState(null);
  const [resultsClosed, setResultsClosed] = useState(null);
  const [resultsTotal, setResultsTotal] = useState(null);
  const [loading, setLoading] = useState(true);

  const getResults = async () => {
    try {
      const resRO = await getResultsOpenActiveRequest();
      setResultsOpen(resRO.data);

      const resRC = await getResultsClosedActiveRequest();
      setResultsClosed(resRC.data);

      const resRT = await getResultsTotalActiveRequest();
      setResultsTotal(resRT.data);
      const res = await getAllResultsActiveRequest();
      setAllResults(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col p-4 md:p-8 bg-sky-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Resultados</h2>
      <div className="w-full flex flex-col justify-center gap-4">
        {allResults.length === 0 && (
          <p className="my-8 text-center text-2xl font-medium dark:text-white">
            No hay resultados de la presente válida o no hay una válida activa.
          </p>
        )}
        {allResults.map((result, index) => (
          <Results
            key={index}
            title={`Válida actual ${result.title}`}
            results={result.results}
            isAverage={false}
          />
        ))}

        {resultsOpen && (
          <>
            <Results
              title={resultsOpen.tableJR.title}
              results={resultsOpen.tableJR.results}
            />
            <Results
              title={resultsOpen.tableX30M.title}
              results={resultsOpen.tableX30M.results}
            />
            <Results
              title={resultsOpen.tableX30S.title}
              results={resultsOpen.tableX30S.results}
            />
            <Results
              title={resultsOpen.tableOPEN.title}
              results={resultsOpen.tableOPEN.results}
            />
            <Results
              title={resultsOpen.tablePARILLA.title}
              results={resultsOpen.tablePARILLA.results}
            />
            <Results
              title={resultsOpen["tableB&S"].title}
              results={resultsOpen["tableB&S"].results}
            />
          </>
        )}
        <br />
        {resultsClosed && (
          <>
            <Results
              title={resultsClosed.tableJR.title}
              results={resultsClosed.tableJR.results}
            />
            <Results
              title={resultsClosed.tableX30M.title}
              results={resultsClosed.tableX30M.results}
            />
            <Results
              title={resultsClosed.tableX30S.title}
              results={resultsClosed.tableX30S.results}
            />
            <Results
              title={resultsClosed.tableOPEN.title}
              results={resultsClosed.tableOPEN.results}
            />
            <Results
              title={resultsClosed.tablePARILLA.title}
              results={resultsClosed.tablePARILLA.results}
            />
            <Results
              title={resultsClosed["tableB&S"].title}
              results={resultsClosed["tableB&S"].results}
            />
          </>
        )}
        {resultsTotal && (
          <>
            <Results
              title={resultsTotal.tableJR.title}
              results={resultsTotal.tableJR.results}
            />
            <Results
              title={resultsTotal.tableX30M.title}
              results={resultsTotal.tableX30M.results}
            />
            <Results
              title={resultsTotal.tableX30S.title}
              results={resultsTotal.tableX30S.results}
            />
            <Results
              title={resultsTotal.tableOPEN.title}
              results={resultsTotal.tableOPEN.results}
            />
            <Results
              title={resultsTotal.tablePARILLA.title}
              results={resultsTotal.tablePARILLA.results}
            />
            <Results
              title={resultsTotal["tableB&S"].title}
              results={resultsTotal["tableB&S"].results}
            />
          </>
        )}
      </div>
    </main>
  );
}
