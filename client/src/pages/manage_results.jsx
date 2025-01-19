import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAllResultsActiveRequest } from "../api/results";
import ResultCard from "../components/results/result_card";

export default function ManageResultsPage() {

  const [allResults, setAllResults] = useState([])

  const getResults = async () => {
    const res = await getAllResultsActiveRequest()
    setAllResults(res.data)
  }

  useEffect(() => {
    getResults()
  }, [])

  return (
    <main className="flex flex-col p-4 md:p-8  bg-sky-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Gestionar resultados de la presente válida</h2>
      <div className="w-full flex flex-wrap justify-center gap-4">
        <Link to="/manage/results/new" className="max-w-sm min-h-[175px] rounded overflow-hidden shadow-lg bg-white hover:bg-gray-50 border border-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700 flex flex-col px-6 justify-center items-center gap-4">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Añadir una nueva tabla de resultados
          </span>
          <FaPlus className="text-gray-900 dark:text-white" size={24} />
        </Link>
        {allResults.map((kart) => (
          <ResultCard key={kart._id} result={kart} />
        ))}
      </div>
    </main>
  );
}
