import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChampionshipCard from "../components/championship/championship_card";
import { getChampionshipsRequest } from "../api/championship";

export default function ManageChampionshipPage() {
  const [championships, setChampionships] = useState([]);

  const getChampionships = async () => {
    try {
      const res = await getChampionshipsRequest();
      setChampionships(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar las validaciones");
    }
  };

  useEffect(() => {
    getChampionships();
  }, []);

  return (
    <main className="flex flex-col p-4 md:p-8  bg-sky-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Campeonatos</h2>
      <div className="w-full flex flex-wrap justify-center gap-4">
        <Link
          to="/manage/championship/new"
          className="max-w-sm min-h-[175px] rounded overflow-hidden shadow-lg bg-white hover:bg-gray-50 border border-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700 flex flex-col px-6 justify-center items-center gap-4"
        >
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Añadir un campeonato
          </span>
          <FaPlus className="text-gray-900 dark:text-white" size={24} />
        </Link>
        {championships.map((kart) => (
          <ChampionshipCard
            key={kart._id}
            id={kart._id}
            title={kart.title}
            description={kart.description}
            open={kart.open}
            dateInit={kart.dateInit}
            dateEnd={kart.dateEnd}
          />
        ))}
      </div>
    </main>
  );
}
