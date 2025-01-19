import { useEffect, useState } from "react";
import { getKartsInscribedRequest } from "../api/karts";
import ListTransponders from "../components/transponders/list_transponders";

export default function ManageTransponders() {
  const [karts, setKarts] = useState([]);

  const getKarts = async () => {
    const res = await getKartsInscribedRequest();
    setKarts(res.data);
  };

  useEffect(() => {
    getKarts();
  }, []);

  return (
    <main className="flex flex-col p-4 md:p-8  bg-sky-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Gestionar transponders de la actual válida
      </h2>
      <div className="w-full flex flex-wrap justify-center gap-4">
        <ListTransponders transponders={karts} />
      </div>
    </main>
  );
}
