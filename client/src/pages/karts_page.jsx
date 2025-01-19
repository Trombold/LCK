import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getKartsRequest } from "../api/karts";
import KartCard from "../components/kart/kart_card";
import { useAuth } from "../contexts/auth_context";

export default function KartPage() {

  const [karts, setKarts] = useState([])
  const {user} = useAuth();

  const getKarts = async () => {
    const res = await getKartsRequest(user.email);
    setKarts(res.data);
  }

  useEffect(() => {
    getKarts();
  }, [])

  return (
    <main className="flex flex-col p-4 md:p-8  bg-sky-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Karts</h2>
      <div className="w-full flex flex-wrap justify-center gap-4">
        <Link to="/karts/new" className="max-w-sm min-h-[175px] rounded overflow-hidden shadow-lg bg-white hover:bg-gray-50 border border-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700 flex flex-col px-6 justify-center items-center gap-4">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Añadir un nuevo kart
          </span>
          <FaPlus className="text-gray-900 dark:text-white" size={24} />
        </Link>
        {karts.map((kart) => (
          <KartCard key={kart._id} id={kart._id} categoria={kart.category} numero={kart.number} haveTransponder={kart.haveTransponder} />
        ))}
      </div>
    </main>
  );
}
